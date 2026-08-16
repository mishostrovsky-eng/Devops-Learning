const { test, expect } = require('@playwright/test');

test.describe('Spiderman Combat App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Test 1: The main header renders on page load.
  test('main header is visible', async ({ page }) => {
    const header = page.locator('h1');
    await expect(header).toBeVisible();
    await expect(header).toContainText('מרכז קרבות ספיידר-מן');
  });

  // Test 2: Attacking updates the combat log text.
  test('attacking a hero updates the combat log', async ({ page }) => {
    const combatLog = page.locator('.log-box');
    const initialLog = await combatLog.textContent();

    await page.getByRole('button', { name: /ירה קורים והלחם/ }).click();

    await expect(combatLog).not.toHaveText(initialLog || '');
  });

  // Test 3: The villain's health bar shrinks after an attack.
  test('health bar changes after an attack', async ({ page }) => {
    const villainHealthBar = page.locator('.health-bar').last();
    const initialWidth = await villainHealthBar.evaluate((el) => el.style.width);

    await page.getByRole('button', { name: /ירה קורים והלחם/ }).click();

    await expect
      .poll(async () => villainHealthBar.evaluate((el) => el.style.width))
      .not.toBe(initialWidth);
  });
});
