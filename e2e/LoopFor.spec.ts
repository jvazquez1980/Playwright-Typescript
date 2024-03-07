import { test } from "@playwright/test";

test.describe("Loop for form @Tags", () => {
  test("test", async ({ page }) => {
    const fields = [
      { name: "name1", email: "email1@example.com" },
      { name: "name2", email: "email2@example.com" },
      { name: "name3", email: "email3@example.com" },
    ];
    await page.goto("https://www.freerangetesters.com/login");
    for (const field of fields) {
      await page.locator("#email").fill(field.name);
      await page.locator("#email").clear();
      await page.locator("#password").fill(field.email);
      await page.locator("#password").clear();
    }
  });
});
