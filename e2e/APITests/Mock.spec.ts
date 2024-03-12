import { test, expect } from '@playwright/test';
test("Hace un mock de un valor que no viene de la API real ", async ({ page,context }) => {
    // Hacemos un mock de la API 
    await page.route('*/**suggested-destinations', async route => {
        const json = [{
          "id": 1,
          "name": "España",
          "amount": 1,
          "url": "\/es\/asia\/extremo-oriente\/japon",
          "imageUrl": "https:\/\/uploads.exoticca.com\/home-suggested-destinations\/country\/1.png"
      }];
        await route.fulfill({ json });
    });
    // Vamos a la página
    await page.goto('https://www.exoticca.com/es');
    await context.addCookies([{name:"exoticca_showed_lead", value: "yes", url: "https://www.exoticca.com"}]);
    await page.mouse.down();

    await expect(page.getByText('España')).toBeVisible();
});

test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page,context }) => {
  // Obtenemos la respuesta y le agregamos un extra
  await page.route('https://rickandmortyapi.com/graphql', async route => {
      const response = await route.fetch();
      const json = await response.json();
      json.push({
        id: "134",
        name: "Muchachada Nui",
        status: "Alive",
        species: "Manchego",
        image: "https://rickandmortyapi.com/api/character/avatar/134.jpeg",
        episode: [
            {
                name: "Rixty Minutes",
                id: "8"
            }
        ],
        location: {
            name: "Interdimensional Cable",
            id: "6"
        }
    },);
      await route.fulfill({ response, json });
  });

  // Vamos a la página
  await page.goto('https://rickandmortyapi.com');

  // Validamos que vino la respuesta real con el extra que le sumamos antes
  await expect(page.getByText('Muchachada Nui', { exact: true })).toBeVisible();
});