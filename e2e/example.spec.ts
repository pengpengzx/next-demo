// example.spec.ts
import { test, expect } from '@playwright/test';


test.only('example test', async ({ page }) => {
  // Log all uncaught errors to the terminal
  page.on('pageerror', exception => {
    console.log(`Uncaught exception: "${exception}"`);
  });
  await page.goto('http://localhost:3000/');
  expect(await page.screenshot()).not.toMatchSnapshot('homePage.png');
});