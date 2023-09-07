import { expect, test } from "@playwright/test";

test.describe("Go Easy @login", () => {
  test.use({ storageState: "./playwright/.auth/admin.json" });
  test.only("login with discord", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.getByRole('button', { name: 'Anmodninger' }).click()
    await page.locator('#mantine-gdxj68dji').click()
    await page.getByRole('option', { name: 'Granted' }).click();
    await page.pause();
  });
});
