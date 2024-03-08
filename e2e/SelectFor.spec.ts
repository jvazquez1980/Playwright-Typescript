import { test, expect } from "@playwright/test";

test.describe("Loop for select", () => {
  test("Comprobar opciones en select @Tags", async ({ page }) => {
    const options = ["Seleccioná un deporte", "Fútbol", "Tennis", "Basketball"];
    await page.goto(
      "https://thefreerangetester.github.io/sandbox-automation-testing/"
    );
    for (const option of options) {
      await page.locator("#formBasicSelect").selectOption(option);
    }
  });
});
