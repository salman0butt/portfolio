import { expect, test } from '@playwright/test';

const articlePath = '/blog/what-senior-software-engineering-really-means-in-production';

test.describe('engineering blog', () => {
  test('blog HTML contains crawlable published article content', async ({ request }) => {
    const response = await request.get('/blog');
    expect(response.ok()).toBeTruthy();
    const html = await response.text();
    expect(html).toContain('What Senior Software Engineering Really Means in Production');
    expect(html).toContain('application/ld+json');
  });

  test('article exposes canonical and structured metadata', async ({ page }) => {
    const response = await page.goto(articlePath);
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole('heading', { level: 1, name: 'What Senior Software Engineering Really Means in Production' })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/blog\/what-senior-software-engineering-really-means-in-production$/);
    await expect(page.locator('script[type="application/ld+json"]')).not.toHaveCount(0);
  });

  test('blog pages do not overflow the viewport', async ({ page }) => {
    for (const path of ['/blog', articlePath]) {
      const response = await page.goto(path);
      expect(response?.ok()).toBeTruthy();
      const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(hasHorizontalOverflow).toBeFalsy();
    }
  });

  test('mobile architecture diagrams use a compact deduplicated tree', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile-only diagram assertion');
    await page.goto(articlePath);

    const diagram = page.locator('figure[data-diagram-title="Example full-stack production boundary"]');
    const mobileView = diagram.locator('[data-diagram-view="mobile"]');

    await expect(mobileView).toBeVisible();
    await expect(diagram.locator('[data-diagram-view="desktop"]')).toBeHidden();
    await expect(mobileView.getByText('Application service', { exact: true })).toHaveCount(1);

    const bounds = await mobileView.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.height).toBeLessThan(1000);
  });

  test('machine-readable discovery endpoints are available', async ({ request }) => {
    const [feed, llms, llmsFull] = await Promise.all([
      request.get('/feed.xml'),
      request.get('/llms.txt'),
      request.get('/llms-full.txt'),
    ]);

    expect(feed.ok()).toBeTruthy();
    expect(feed.headers()['content-type']).toContain('application/rss+xml');
    expect(await feed.text()).toContain('What Senior Software Engineering Really Means in Production');

    expect(llms.ok()).toBeTruthy();
    expect(await llms.text()).toContain('/blog/what-senior-software-engineering-really-means-in-production');

    expect(llmsFull.ok()).toBeTruthy();
    expect(await llmsFull.text()).toContain('Senior software engineering');
  });
});
