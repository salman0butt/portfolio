import { timingSafeEqual } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function secureEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function getConfig() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, '');
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const expectedToken = process.env.PORTFOLIO_MCP_TOKEN;
  const adminEmail = process.env.PORTFOLIO_MCP_ADMIN_EMAIL?.trim().toLowerCase();

  if (!url || !publishableKey || !expectedToken || !adminEmail) return null;
  return { url, publishableKey, expectedToken, adminEmail };
}

function errorResponse(message: string, status = 400) {
  return new Response(message, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request) {
  const config = getConfig();
  if (!config) return errorResponse('OAuth server is not fully configured.', 500);

  const form = await request.formData();
  const authorizationId = String(form.get('authorization_id') || '').trim();
  const decision = String(form.get('decision') || 'approve').trim();
  const email = String(form.get('email') || '').trim().toLowerCase();
  const password = String(form.get('password') || '');
  const adminToken = String(form.get('admin_token') || '');

  if (!authorizationId || !email || !password) return errorResponse('Missing authorization details.');
  if (!secureEqual(adminToken, config.expectedToken)) return errorResponse('Invalid Portfolio MCP admin token.', 403);
  if (email !== config.adminEmail) return errorResponse('This account is not allowed to authorize the Portfolio MCP.', 403);

  const loginResponse = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: config.publishableKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  });

  const loginData = await loginResponse.json().catch(() => null) as {
    access_token?: string;
    user?: { email?: string };
    msg?: string;
    error_description?: string;
  } | null;

  if (!loginResponse.ok || !loginData?.access_token) {
    return errorResponse(loginData?.error_description || loginData?.msg || 'Supabase sign-in failed.', 401);
  }

  if (loginData.user?.email?.trim().toLowerCase() !== config.adminEmail) {
    return errorResponse('Authenticated Supabase account is not the Portfolio MCP admin.', 403);
  }

  const origin = new URL(request.url).origin;
  const authHeaders = {
    apikey: config.publishableKey,
    Authorization: `Bearer ${loginData.access_token}`,
    Origin: origin,
    Accept: 'application/json',
  };

  // This call associates the pending OAuth authorization with the authenticated
  // Supabase user and may auto-approve a previously granted client.
  const detailsResponse = await fetch(`${config.url}/auth/v1/oauth/authorizations/${encodeURIComponent(authorizationId)}`, {
    method: 'GET',
    headers: authHeaders,
    cache: 'no-store',
  });

  const details = await detailsResponse.json().catch(() => null) as { redirect_url?: string; message?: string; msg?: string } | null;
  if (!detailsResponse.ok) {
    return errorResponse(details?.message || details?.msg || 'Could not load OAuth authorization request.', detailsResponse.status);
  }

  if (details?.redirect_url) {
    return Response.redirect(details.redirect_url, 303);
  }

  const consentResponse = await fetch(`${config.url}/auth/v1/oauth/authorizations/${encodeURIComponent(authorizationId)}/consent`, {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: decision === 'deny' ? 'deny' : 'approve' }),
    cache: 'no-store',
  });

  const consent = await consentResponse.json().catch(() => null) as { redirect_url?: string; message?: string; msg?: string } | null;
  if (!consentResponse.ok || !consent?.redirect_url) {
    return errorResponse(consent?.message || consent?.msg || 'OAuth consent failed.', consentResponse.status || 400);
  }

  return Response.redirect(consent.redirect_url, 303);
}
