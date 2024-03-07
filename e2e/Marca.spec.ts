import { test, expect } from "@playwright/test";

test("Marca test @Tags", async ({ page }) => {
  await page.goto("https://www.marca.com/");
  await page.getByRole("button", { name: "Aceptar y continuar" }).click();
  await expect(
    page.locator("a").filter({ hasText: "Portada de Marca" })
  ).toBeVisible();
  await expect(
    page.getByRole("menuitem", { name: "Athletic Club" })
  ).toBeVisible();
  await page.getByRole("menuitem", { name: "Athletic Club" }).click();
  await page.getByRole("link", { name: "Calendario", exact: true }).click();
  await expect(page.locator("#ID_title_menu_local")).toContainText(
    "Athletic Club"
  );
});
