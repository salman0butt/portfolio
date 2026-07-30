import { test } from '@playwright/test';

test.describe('Light Mode Text Visibility', () => {
  test('check all text elements for sufficient contrast', async ({ page }) => {
    await page.goto('http://localhost:3001');

    await page.click('button[aria-label="Toggle theme"]');
    await page.waitForTimeout(500);

    const htmlClass = await page.locator('html').getAttribute('class');
    console.log('HTML class:', htmlClass);

    await page.screenshot({ path: 'light-mode-hero.png', fullPage: false });

    console.log('\n=== NAVBAR ===');
    const navButtons = await page.locator('nav button').all();
    for (let i = 0; i < navButtons.length; i++) {
      const color = await navButtons[i].evaluate((el) => window.getComputedStyle(el).color);
      console.log(`Nav button ${i}: ${color}`);
    }

    console.log('\n=== HERO SECTION ===');
    const heroTitle = page.locator('h1').first();
    const titleColor = await heroTitle.evaluate((el) => window.getComputedStyle(el).color);
    console.log('Hero title color:', titleColor);

    const heroDescription = page.locator('#hero p').first();
    const descColor = await heroDescription.evaluate((el) => window.getComputedStyle(el).color);
    console.log('Hero description color:', descColor);

    await page.locator('a[href="#projects"]').first().click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'light-mode-projects.png' });

    console.log('\n=== PROJECTS SECTION ===');
    const projectTitle = page.locator('#projects h2');
    const projectTitleColor = await projectTitle.evaluate((el) => window.getComputedStyle(el).color);
    console.log('Projects title color:', projectTitleColor);

    await page.locator('a[href="#experience"]').first().click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'light-mode-experience.png' });

    console.log('\n=== EXPERIENCE SECTION ===');
    const expTitle = page.locator('#experience h2');
    const expTitleColor = await expTitle.evaluate((el) => window.getComputedStyle(el).color);
    console.log('Experience title color:', expTitleColor);

    await page.locator('a[href="#skills"]').first().click();
    await page.waitForTimeout(600);

    console.log('\n=== EXPERTISE SECTION ===');
    const skillsTitle = page.locator('#skills h2');
    const skillsTitleColor = await skillsTitle.evaluate((el) => window.getComputedStyle(el).color);
    console.log('Expertise title color:', skillsTitleColor);

    await page.locator('a[href="#about"]').first().click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'light-mode-about.png' });

    console.log('\n=== ABOUT SECTION ===');
    const aboutTitle = page.locator('#about h2');
    const aboutTitleColor = await aboutTitle.evaluate((el) => window.getComputedStyle(el).color);
    console.log('About title color:', aboutTitleColor);

    const skillCards = await page.locator('.glass').all();
    console.log(`Found ${skillCards.length} glass cards`);

    await page.locator('a[href="#contact"]').first().click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'light-mode-contact.png' });

    console.log('\n=== CONTACT SECTION ===');
    const contactTitle = page.locator('#contact h2');
    const contactTitleColor = await contactTitle.evaluate((el) => window.getComputedStyle(el).color);
    console.log('Contact title color:', contactTitleColor);

    await page.screenshot({ path: 'light-mode-full.png', fullPage: true });
  });
});
