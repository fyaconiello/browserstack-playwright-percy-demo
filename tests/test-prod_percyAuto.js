// tests/test-percy-minimal.js
// Visits a list of pages and takes a single Percy snapshot on each.
// Requires PERCY_TOKEN in the environment.

// Load environment variables and configuration
require('./setup.js');

import { test } from '@playwright/test';
import { percyScreenshot } from '@percy/playwright'; // prefer official helper

//  Run tests in parallel
test.describe.configure({ mode: 'parallel' });

// Pages you want to capture
const pages = [
  { name: 'Home',             url: 'https://test-specright.pantheonsite.io/' },
  { name: 'Blog',             url: 'https://test-specright.pantheonsite.io/blog/' },
  { name: 'Press Releases',   url: 'https://test-specright.pantheonsite.io/press-releases/' },
  { name: 'Customer Support', url: 'https://test-specright.pantheonsite.io/customer-support/' },
  { name: 'Contact Us',       url: 'https://test-specright.pantheonsite.io/contact-us/' },
];

pages.forEach(({ name, url }) => {
  test(`${name} - Percy snapshot`, async ({ page }, testInfo) => {
    // Navigate & let things settle a touch
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(20000);

    async function scrollPage(page) {
   
    // scroll down the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    // scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    }

    // Include browser in the snapshot name so you can share per-browser results
    const browser = testInfo.project.name; // e.g., chromium / firefox / webkit
    await percyScreenshot(page, `${name} - ${browser}`, {
      widths: ["414", "768", "1024", "1280"],
      fullPage: true,
    });
    await page.waitForTimeout(500); // just to be sure
  });
});
