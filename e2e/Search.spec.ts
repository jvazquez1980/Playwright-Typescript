import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.exoticca.com/us");
  await page.getByTestId("modal-close-button").click();
  await page.getByTestId("departure-input").getByTestId("input-field").click();
  await page.getByRole("listitem", { name: "Chicago" }).click();
  await page
    .getByTestId("destination-input")
    .getByTestId("input-field")
    .click();
  await page;
  page
    .getByRole("listitem", { name: "map-pin-iconArgentina" })
    .getByRole("listitem")
    .filter({ hasText: "map-pin-iconArgentina" })
    .click();
  await page
    .getByTestId("departure-date-input")
    .locator("div")
    .filter({ hasText: "Departure date" })
    .click();
  await page.getByText("calendar-iconMay2024").click();
  await page.getByTestId("searchBox-search-button").click();
  await expect(page.getByText("FiltersClear filters")).toBeVisible();
  await expect(page.locator("#sortBy")).toContainText(
    "Popular firstCheapest First"
  );
});
