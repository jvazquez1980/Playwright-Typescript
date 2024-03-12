import { test, expect } from "@playwright/test";

const Repo = "Playwright-Typescript";
const User = "jvazquez1980";

test.afterAll(async ({ request }) => {
  const response = await request.delete(`/repos/${User}/${Repo}`);
  expect(response.ok()).toBeTruthy();
});

test("Bug1", async ({ request }) => {
  const newIssue = await request.post(`'/'/${User}/${Repo}/issues`, {
    data: {
      title: "[Bug] Prueba 1",
      body: "Algo no está funcionando bien",
    },
  });
  expect(newIssue.status()).toBe(200);

  const issues = await request.get(`/repos/${User}/${Repo}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(
    expect.objectContaining({
      title: "[Bug] Prueba 1",
      body: "Algo no está funcionando bien",
    })
  );
});

test("Bug2", async ({ request }) => {
  const newIssue = await request.post(`/repos/${User}/${Repo}/issues`, {
    data: {
      title: "[Bug] Hace un post",
      body: "Grabamos un post ",
    },
  });
  expect(newIssue.status()).toBe(200);

  const issues = await request.get(`/repos/${User}/${Repo}/issues`);
  expect(issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(
    expect.objectContaining({
      title: "[Bug] Hace un post",
      body: "Grabamos un post ",
    })
  );
});

