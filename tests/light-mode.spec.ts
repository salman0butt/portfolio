import { test, expect } from '@playwright/test';

test.describe('Light Mode Text Visibility', () => {
  test('check all text elements for sufficient contrast', async ({ page }) => {
    // Start dev server if needed
    await page.goto('http://localhost:3001');

    // Switch to light mode
    await page.click('button[aria-label="Toggle theme"]');
    await page.waitForTimeout(500);

    // Check if light mode is active
    const htmlClass = await page.locator('html').getAttribute('class');
    console.log('HTML class:', htmlClass);

    // Take screenshot of light mode
    await page.screenshot({ path: 'light-mode-hero.png', fullPage: false });

    // Check navbar text
    console.log('\n=== NAVBAR ===');
    const navLinks = await page.locator('nav button').all();
    for (let i = 0; i < navLinks.length; i++) {
      const color = await navLinks[i].evaluate(el => window.getComputedStyle(el).color);
      console.log(`Nav link ${i}: ${color}`);
    }

    // Check hero section text
    console.log('\n=== HERO SECTION ===');
    const heroTitle = page.locator('h1').first();
    const titleColor = await heroTitle.evaluate(el => window.getComputedStyle(el).color);
    console.log('Hero title color:', titleColor);

    const heroSubtitle = page.locator('h2').first();
    const subtitleColor = await heroSubtitle.evaluate(el => window.getComputedStyle(el).color);
    console.log('Hero subtitle color:', subtitleColor);

    const heroDescription = page.locator('p').first();
    const descColor = await heroDescription.evaluate(el => window.getComputedStyle(el).color);
    console.log('Hero description color:', descColor);

    // Scroll to About section
    await page.click('text=About');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'light-mode-about.png' });

    console.log('\n=== ABOUT SECTION ===');
    const aboutTitle = page.locator('#about h2');
    const aboutTitleColor = await aboutTitle.evaluate(el => window.getComputedStyle(el).color);
    console.log('About title color:', aboutTitleColor);

    // Check skill cards
    const skillCards = await page.locator('.glass').all();
    console.log(`Found ${skillCards.length} glass cards`);

    // Scroll to Projects
    await page.click('text=Projects');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'light-mode-projects.png' });

    console.log('\n=== PROJECTS SECTION ===');
    const projectTitle = page.locator('#projects h2');
    const projectTitleColor = await projectTitle.evaluate(el => window.getComputedStyle(el).color);
    console.log('Projects title color:', projectTitleColor);

    // Scroll to Experience
    await page.click('text=Experience');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'light-mode-experience.png' });

    console.log('\n=== EXPERIENCE SECTION ===');
    const expTitle = page.locator('#experience h2');
    const expTitleColor = await expTitle.evaluate(el => window.getComputedStyle(el).color);
    console.log('Experience title color:', expTitleColor);

    // Scroll to Contact
    await page.click('text=Contact');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'light-mode-contact.png' });

    console.log('\n=== CONTACT SECTION ===');
    const contactTitle = page.locator('#contact h2');
    const contactTitleColor = await contactTitle.evaluate(el => window.getComputedStyle(el).color);
    console.log('Contact title color:', contactTitleColor);

    // Full page screenshot
    await page.screenshot({ path: 'light-mode-full.png', fullPage: true });

    console.log('\nScreenshots saved! Check for text visibility issues.');
  });
});
