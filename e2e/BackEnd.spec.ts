import { test, expect } from "@playwright/test";
import { request } from "playwright";

test.describe("Comprobar id y name en la API de Rick and Morty", async () => {
  test("test", async ({ page }) => {
    await page.goto("https://rickandmortyapi.com/");
    const context = await request.newContext({
      baseURL: "https://rickandmortyapi.com/",
    });
    const response = await context.get(
      "https://rickandmortyapi.com/api/character/211"
    );
    console.log("Response status:", response.status); // Agrega esta línea para imprimir el valor real
    expect(response.status).toBe(200);
  });
});
