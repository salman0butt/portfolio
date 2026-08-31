import { expect, test } from '@playwright/test';

const articlePath = '/blog/what-senior-software-engineering-really-means-in-production';
const hybridRetrievalArticlePath = '/blog/hybrid-retrieval-rag-rrf-reranking';

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

  test('adjacent TypeScript and Python fences render as one grouped code card', async ({ page }) => {
    const response = await page.goto(hybridRetrievalArticlePath);
    expect(response?.ok()).toBeTruthy();

    const codeGroup = page.getByRole('tablist', { name: 'Code language' }).first();
    const codeCard = codeGroup.locator('xpath=../../..');
    const searchHitExamples = page.locator('code').filter({ hasText: 'type SearchHit = {' });

    await expect(codeGroup.getByRole('tab', { name: 'TypeScript', exact: true })).toBeVisible();
    await expect(codeGroup.getByRole('tab', { name: 'Python', exact: true })).toBeVisible();
    await expect(searchHitExamples).toHaveCount(1);
    await expect(codeCard.locator('code[data-language="ts"]')).toBeVisible();
    await expect(codeCard.locator('code[data-language="py"]')).toHaveCount(0);

    await codeGroup.getByRole('tab', { name: 'Python', exact: true }).click();

    await expect(codeCard.locator('code[data-language="py"]')).toBeVisible();
    await expect(codeCard.locator('code[data-language="ts"]')).toHaveCount(0);
    await expect(searchHitExamples).toHaveCount(0);
  });

  test('single-language fences remain standalone code blocks', async ({ page }) => {
    const response = await page.goto(articlePath);
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole('tablist', { name: 'Code language' })).toHaveCount(0);
    await expect(page.locator('code[data-language="ts"]').first()).toBeVisible();
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
