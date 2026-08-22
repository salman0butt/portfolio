import { expect, test } from '@playwright/test';

test.describe('portfolio hiring journey', () => {
  test('restored homepage keeps the original portfolio sections and skills', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1, name: 'Salman Butt' })).toBeVisible();
    await expect(page.locator('#hero .section-label')).toHaveText('SENIOR FULL STACK & GENAI ENGINEER');
    await expect(page.locator('h1')).toHaveCount(1);

    for (const section of ['about', 'experience', 'projects', 'skills', 'contact']) {
      await expect(page.locator(`#${section}`)).toBeVisible();
    }

    const skills = page.locator('#skills');
    for (const skill of ['React', 'Next.js', 'TypeScript', 'Node.js', 'Laravel', 'Python', 'LangGraph', 'LangSmith', 'RabbitMQ', 'MQTT', 'Docker', 'Kubernetes']) {
      await expect(skills.getByText(skill, { exact: true }).first()).toBeVisible();
    }

    await expect(page.getByRole('link', { name: 'Blog' }).first()).toHaveAttribute('href', '/blog');
  });

  test('blog remains available after the portfolio rollback', async ({ page }) => {
    const response = await page.goto('/blog');
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('main')).toBeVisible();
  });

  test('mobile navigation still reaches skills and blog', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile-only navigation assertion');
    await page.goto('/');

    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await expect(page.getByRole('link', { name: 'Skills' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Blog' }).first()).toBeVisible();
  });

  test('SEO metadata routes remain available', async ({ request }) => {
    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain('sitemap.xml');

    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain('/blog');
  });
});
