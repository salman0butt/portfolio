type ConsentPageProps = {
  searchParams: Promise<{ authorization_id?: string }>;
};

export default async function OAuthConsentPage({ searchParams }: ConsentPageProps) {
  const { authorization_id: authorizationId } = await searchParams;

  if (!authorizationId) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-16">
        <div className="w-full rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
          <h1 className="text-xl font-semibold">Invalid OAuth request</h1>
          <p className="mt-2 text-sm opacity-80">The authorization request is missing its authorization ID.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-16">
      <section className="w-full rounded-2xl border border-white/10 bg-black/40 p-7 shadow-2xl backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.2em] opacity-60">Portfolio MCP</p>
        <h1 className="mt-3 text-3xl font-semibold">Authorize ChatGPT</h1>
        <p className="mt-3 text-sm leading-6 opacity-75">
          ChatGPT is requesting access to your private Portfolio MCP. Approval allows the MCP to manage blog drafts,
          publish or unpublish articles, and manage blog images.
        </p>

        <form action="/api/oauth/consent" method="post" className="mt-7 space-y-4">
          <input type="hidden" name="authorization_id" value={authorizationId} />
          <input type="hidden" name="decision" value="approve" />

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Supabase Auth email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-white/40"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Supabase Auth password</span>
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-white/40"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Portfolio MCP admin token</span>
            <input
              required
              type="password"
              name="admin_token"
              autoComplete="off"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-white/40"
            />
            <span className="mt-1.5 block text-xs opacity-60">Use the PORTFOLIO_MCP_TOKEN stored in Vercel. It is submitted over HTTPS and is never placed in the URL.</span>
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:opacity-90"
          >
            Authorize ChatGPT
          </button>
        </form>

        <p className="mt-5 text-xs leading-5 opacity-55">
          Only the email configured in PORTFOLIO_MCP_ADMIN_EMAIL is accepted. Credentials are used only to complete this authorization request and are not stored by the portfolio.
        </p>
      </section>
    </main>
  );
}
