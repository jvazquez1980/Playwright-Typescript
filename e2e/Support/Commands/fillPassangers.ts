import { expect } from "playwright/test";

export const personalizationActions = async (page) => {
  await expect(
    page.locator("#passenger-0").getByText("Veuillez inscrire les noms et")
  ).toBeVisible();
  await page.waitForTimeout(5000);
  await page
    .locator('[id="passengers\\.0\\.gender\\.value"]')
    .selectOption("M");
  await page
    .locator('input[name="passengers\\.0\\.firstName\\.value"]')
    .fill("Test");
  await page
    .locator('input[name="passengers\\.0\\.lastName\\.value"]')
    .fill("Test");
  await page
    .locator('select[name="passengers\\.0\\.birthday\\.date\\.day"]')
    .selectOption("03");
  await page
    .locator('select[name="passengers\\.0\\.birthday\\.date\\.month"]')
    .selectOption("03");
  await page
    .locator('select[name="passengers\\.0\\.birthday\\.date\\.year"]')
    .selectOption("1989");
  await page.locator('[id="passengers\\.0\\.document\\.value"]').click();
  await page
    .locator('[id="passengers\\.0\\.document\\.value"]')
    .fill("22222223333333");
  await page
    .locator('[id="passengers\\.0\\.document\\.expirationDate\\.day"]')
    .selectOption("03");
  await page
    .locator('[id="passengers\\.0\\.document\\.expirationDate\\.month"]')
    .selectOption("06");
  await page
    .locator('[id="passengers\\.0\\.document\\.expirationDate\\.year"]')
    .selectOption("2033");
  await page.getByRole("button", { name: "Suivante" }).click();
  await page
    .locator('[id="passengers\\.1\\.gender\\.value"]')
    .selectOption("F");
  await page
    .locator('input[name="passengers\\.1\\.firstName\\.value"]')
    .fill("test1");
  await page
    .locator('input[name="passengers\\.1\\.lastName\\.value"]')
    .fill("Test1");
  await page
    .locator('select[name="passengers\\.1\\.birthday\\.date\\.day"]')
    .selectOption("04");
  await page
    .locator('select[name="passengers\\.1\\.birthday\\.date\\.month"]')
    .selectOption("03");
  await page
    .locator('select[name="passengers\\.1\\.birthday\\.date\\.year"]')
    .selectOption("2021");
  await page.locator('[id="passengers\\.1\\.document\\.value"]').click();
  await page
    .locator('[id="passengers\\.1\\.document\\.value"]')
    .fill("2323232323232");
  await page
    .locator('[id="passengers\\.1\\.document\\.expirationDate\\.day"]')
    .selectOption("02");
  await page
    .locator('[id="passengers\\.1\\.document\\.expirationDate\\.month"]')
    .selectOption("03");
  await page
    .locator('[id="passengers\\.1\\.document\\.expirationDate\\.year"]')
    .selectOption("2033");
};
