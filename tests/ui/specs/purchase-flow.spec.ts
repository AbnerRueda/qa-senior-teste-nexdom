import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

test('end-to-end purchase flow - saucedemo', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login(process.env.TEST_USER || 'standard_user', process.env.TEST_PASSWORD || 'secret_sauce');

  await expect(page.locator('.inventory_list')).toBeVisible({ timeout: 5000 });

  await inventory.addFirstItemToCart();
  await inventory.goToCart();

  await expect(page.locator('.cart_list')).toBeVisible();
  await page.screenshot({ path: 'reports/cart_screenshot.png', fullPage: true });

  await inventory.checkout('QA', 'Senior', '00000');

  await expect(page.locator('.complete-header')).toHaveText(/thank you for your order/i);
});
