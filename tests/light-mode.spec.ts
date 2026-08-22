import { expect, test } from '@playwright/test';

test.describe('portfolio hiring journey', () => {
  test('homepage communicates senior full-stack + GenAI positioning and complete skills', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('scalable product systems');
    await expect(page.getByText('Senior Full Stack & Generative AI Engineer').first()).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);

    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#ai-engineering')).toBeVisible();
    await expect(page.locator('#experience')).toBeVisible();
    await expect(page.locator('#skills')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();

    const skills = page.locator('#skills');
    for (const skill of ['React', 'Next.js', 'TypeScript', 'Node.js', 'Laravel', 'Python', 'FastAPI', 'LangGraph', 'LangSmith', 'RAG', 'MCP', 'RabbitMQ', 'MQTT', 'Docker', 'Kubernetes']) {
      await expect(skills.getByText(skill, { exact: true }).first()).toBeVisible();
    }
  });

  test('case-study route exposes architecture, constraints, trade-offs and proof context', async ({ page }) => {
    await page.goto('/projects/conversational-ai-platform');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Conversational AI Agent Platform');
    await expect(page.getByRole('heading', { name: 'Challenge & constraints' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'System flow' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What the choices cost' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What I would carry into the next system' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Multi-Agent RAG Support System/i })).toBeVisible();
  });

  test('theme, keyboard focus and mobile navigation remain usable', async ({ page, isMobile }) => {
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
    await page.getByRole('button', { name: 'Toggle theme' }).first().click();
    await expect(html).not.toHaveClass(/dark/);

    // Reload to verify the selected theme persists and to reset browser focus
    // to the document entry point before testing keyboard navigation.
    await page.reload();
    await expect(html).not.toHaveClass(/dark/);

    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();

    if (isMobile) {
      await page.getByRole('button', { name: 'Toggle menu' }).click();
      await expect(page.getByRole('link', { name: 'Expertise' })).toBeVisible();
      await page.getByRole('link', { name: 'Expertise' }).click();
      await expect(page.locator('#skills')).toBeInViewport();
    }
  });

  test('SEO metadata routes are available', async ({ request }) => {
    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain('sitemap.xml');

    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    const xml = await sitemap.text();
    expect(xml).toContain('/projects/conversational-ai-platform');
    expect(xml).toContain('/projects/permission-ask');
  });
});
