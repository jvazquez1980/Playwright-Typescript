import { test, expect } from "@playwright/test";

test.describe("First tests", () => {
  test("Test", async ({ page }) => {
    await test.step("Go to Cursos", async () => {
      page.goto("https://www.freerangetesters.com/");
      page
        .locator('[data-testid="header-container"]')
        .getByRole("link", { name: "Cursos", exact: true })
        .click();
      await page.waitForURL("**/cursos");
    });

    await test.step("Assertion", async () => {
      page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });
      expect(await page.title()).toBe("Cursos");
      await page.getByText("Unit Testing").click();
      await page.waitForURL("**/unit-testing");
    });

    await test.step("Bolean", async () => {
      const count = await page
        .locator('[data-external-link-checked="true"]')
        .count();
      console.log("El valor de testId es: ", count);
      if (count > 1) {
        await page.locator('[data-testid="grid-item"]').first().click();
      } else {
        console.log("No hay cursos disponibles");
      }
    });
  });
});
