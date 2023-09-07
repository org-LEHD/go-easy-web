import { expect, test } from "@playwright/test";
import { login } from "./login";
test.describe("Go Easy @login", () => {
  test("login with discord", async ({ page }) => {
    await login(page, "Galvit28@gmail.com", "abekat123456");
    const headerElement = page.locator(
      'header div div div:has-text("Go Easy Test")'
    );
    const headerText = await headerElement.innerText();
    expect(headerText).toContain("Go Easy Test");
  });
  test("login with discord failure", async ({ page }) => {
    await login(page, "Galvit28@gmail.com", "abekat123456");
    const headerElement = page.locator(
      'header div div div:has-text("Go Easy Test")'
    );
    const headerText = await headerElement.innerText();
    expect(headerText).not.toContain("Go Easy abe");
  });
});
