import { expect, test } from '@playwright/test';

test.describe('Portfolio smoke checks', () => {
  test('renders the recruiter-first flow and toggles theme', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Building AI-powered products and the systems behind them.',
      }),
    ).toBeVisible();

    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#experience')).toBeVisible();
    await expect(page.locator('#skills')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    await page.getByRole('button', { name: 'Toggle theme' }).click();
    await expect(html).not.toHaveClass(/dark/);

    await page.getByRole('button', { name: 'Toggle theme' }).click();
    await expect(html).toHaveClass(/dark/);
  });

  test('primary calls to action point to work, resume, and contact', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'View Selected Work' })).toHaveAttribute(
      'href',
      '#projects',
    );

    await expect(page.getByRole('link', { name: 'Resume', exact: true })).toHaveAttribute(
      'href',
      '/Salman_Butt_Resume.pdf',
    );

    await expect(page.getByRole('link', { name: "Let's Talk", exact: true }).first()).toHaveAttribute(
      'href',
      'mailto:salman0butt@gmail.com',
    );
  });
});
