import { test, expect, type Page, Browser } from "@playwright/test";
export { PlaywrightTestConfig } from "@playwright/test";

(async () => {
  let browser: Browser;
  let page: Page;

  test.describe("Navegación en web de Islas Baleares", () => {
    const secciones = [
      {
        nombre: "Las islas",
        url: "/illes-balears",
        tituloEsperado: "Illes Balears",
      },
      {
        nombre: "Agenda",
        url: "/agenda",
        tituloEsperado: "Agenda en Illes Balears",
      },
      {
        nombre: "Publicaciones",
        url: "/publicaciones",
        tituloEsperado: "Publicaciones en Illes Balears",
      },
    ];
    for (const seccion of secciones) {
      test(`Validar redirección a la sección "${seccion.nombre}"`, async ({
        page,
      }) => {
        await test.step(`Estando yo en la web principal Islas Baleares`, async () => {
          page.goto("https://www.illesbalears.travel/");
          page
            .locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll")
            .click();
          await expect(page).toHaveTitle("Illes Balears");
        });

        await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
          page
            .locator("id=sticky-wrapper")
            .getByRole("link", { name: seccion.nombre, exact: true })
            .click();
          await page.waitForURL(`**${seccion.url}`);
        });

        await test.step(`Soy redirigido a la sección de título "${seccion.tituloEsperado}"`, async () => {
          await expect(page).toHaveTitle(seccion.tituloEsperado);
        });

        await test.step("Clicko submenu", async () => {
          await page
            .locator("id=sticky-wrapper")
            .getByText("¿Cuándo viajas?")
            .click();
        });
      });
    }
  });
})();
