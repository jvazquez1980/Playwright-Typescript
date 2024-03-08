import { test, expect } from "@playwright/test";

test.describe("Prueba de la página de recursos", () => {
  test("Registro en la página de recursos @Tags", async ({ page }) => {
    test.info().annotations.push({
      type: "test",
      description: "Prueba de la página de recursos",
    });
    await page.goto("https://www.freerangetesters.com/recursos");

    const image = page.locator('data-testid="container"');
    expect(await image.isVisible()).toBe(true);

    const element = page.locator('data-testid="media"');
    expect(await element.isVisible()).toBe(true);

    // Rellena el formulario de registro con un correo electrónico y nombre aleatorios
    const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
    const randomName = `Test User ${Math.floor(Math.random() * 10000)}`;

    await page.fill("#email-form-mail", randomEmail);
    await page.fill("#email-form-name", randomName);
    await page.getByText("Registrarme").click();

    const successMessage = page.getByText("Gracias por registrarte!");
    expect(await successMessage.isVisible()).toBe(true);
  });
});
