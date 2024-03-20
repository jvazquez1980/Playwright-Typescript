import { defineConfig, devices } from "@playwright/test";


export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  timeout: 50000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  // /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // baseURL: 'http://127.0.0.1:3000',

    trace: "on",
    video:'retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [


    {
      name: 'Computadora',
      testMatch: "/*.spec.ts",
      use: { ...devices['Desktop Chrome'] },
    },
 
    {
      name: ' Iphone',
      testMatch: "/*.spec.ts",
      use: { ...devices['iPhone 12'] },
    },
 
    {
      name: 'iPad',
      testMatch: "/*.spec.ts",
      use: { ...devices['iPad (gen 7)'] },
    },

    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    {
      name: "API Tests",
      testMatch: "APITests/**/*",
      use: {
        baseURL: "https://github.com/",
        extraHTTPHeaders: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${process.env.API_TOKEN}`,
        },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
