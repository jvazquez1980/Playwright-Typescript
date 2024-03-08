import { test, expect } from "@playwright/test";

const REPO = "RepoDePrueba";
const USER = "JaviTest";

test("Bug1", async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: "[Bug] Prueba 1",
      body: "Algo no está funcionando bien",
    },
  });
  expect(newIssue.status()).toBe(200);

  const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(
    expect.objectContaining({
      title: "[Bug] Prueba 1",
      body: "Algo no está funcionando bien",
    })
  );
});

test("Bug2", async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: "[Bug] Hace un post",
      body: "Grabamos un post ",
    },
  });
  expect(newIssue.status()).toBe(200);

  const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(
    expect.objectContaining({
      title: "[Bug] Hace un post",
      body: "Grabamos un post ",
    })
  );
});
