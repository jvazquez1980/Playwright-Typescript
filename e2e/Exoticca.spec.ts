import { test, expect } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: "exoticca_showed_lead",
      value: "yes",
      domain: "exoticca.com",
      path: "/",
    },
  ]);
});
test.describe("Exoticca demo", () => {
  test("Test", async ({ page, context }) => {
    await test.step("Home", async () => {
      await page.goto("https://www.exoticca.com/fr");
    });

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

    await test.step("PDP", async () => {
      await page
        .locator('[aria-label="calendar-day"]')
        .filter({ hasNotText: "1 Left" })
        .filter({ hasText: "€" })
        .locator('[data-testid="calendar-price-wrapper"]')
        .first()
        .click();
      await page.waitForURL("**/my-trip/personalization");
    });
    await test.step("Checkout", async () => {
      await page.getByLabel("Agree and close: Agree to our").click();
      await page
        .locator("div")
        .filter({ hasText: /^PrécédentContinuer$/ })
        .getByTestId("checkout-next-step-controller")
        .click();
      await page.getByPlaceholder("Email").fill("mail");
      await page.getByPlaceholder("Email").fill("mail@example.com");
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
    });
  });
});
