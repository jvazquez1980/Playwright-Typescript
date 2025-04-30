import { test, expect } from "@playwright/test";
import { personalizationActions } from "./Support/Commands/fillPassangers";
export { personalizationActions } from "./Support/Commands/fillPassangers";

test.describe("Exoticca demo", () => {
  test("Test", async ({ page, context }) => {
    await test.step("Home", async () => {
      await page.goto("https://www.exoticca.com/fr");
    });

    await context.addCookies([
      {
        name: "exoticca_showed_lead",
        value: "yes",
        url: "https://www.exoticca.com",
      },
    ]);
    await test.step("Go to pdp", async () => {
      await page.locator('[data-testid="card-campaign-link"]').first().click();
      await expect(page.getByTestId("pdp-campaign-header")).toContainText(
        "Voir les dates et les prix"
      );
      await expect(page.getByTestId("pdp-pdf-button")).toBeVisible();
      await page
        .getByTestId("pdp-campaign-header")
        .getByRole("button", { name: "Voir les dates et les prix" })
        .click();
      await page
        .getByTestId("departure-city-filter")
        .getByTestId("filter-input-display-info-wrapper")
        .click();
      await page.getByText("Bordeaux").click();
    });

    await test.step("Select a date", async () => {
      await page
        .locator('[aria-label="calendar-day"]')
        .filter({ hasNotText: "1 Left" })
        .filter({ hasText: "€" })
        .locator('[data-testid="calendar-price-wrapper"]')
        .first()
        .click();
      await page.waitForURL("**/personalization/**", { timeout: 50000 });
    });
    await test.step("Go to Checkout", async () => {
      await page.getByLabel("Agree and close: Agree to our").click();
      await page
        .locator("div")
        .filter({ hasText: /^PrécédentContinuer$/ })
        .getByTestId("checkout-next-step-controller")
        .click();
      await page.getByPlaceholder("Email").fill("mail");
      await page.getByPlaceholder("Email").fill("mailplaywright@example.com");
      await page.getByPlaceholder("Votre téléphone ici").fill("+33 3 333 3333");
      await page
        .locator("label")
        .filter({ hasText: "J’ai lu et j’accepte les" })
        .getByTestId("checkbox__checkmark")
        .click();
      await page
        .getByTestId("passengers-step-container")
        .getByRole("button", { name: "Continuer" })
        .click();
      await expect(page.getByTestId("loading_dots")).not.toBeVisible();
    });
    await test.step("Personalization step", async () => {
      personalizationActions(page);
    });
    await test.step("Select Bank Transfer", async () => {
      await page
        .locator("section")
        .filter({ hasText: "PrécédentVous ne serez pas" })
        .getByTestId("checkout-next-step-controller")
        .click();
      await page.getByText("Virement bancaire").click();
    });
  });
});
