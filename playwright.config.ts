import { defineConfig, devices } from "@playwright/test"

import { z } from "zod"

const port = z.coerce.number().int().min(1024).max(65535).default(3100).parse(process.env.PLAYWRIGHT_PORT)

export default defineConfig({
  testDir: "./tests",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "contracts", testMatch: "**/*.unit.spec.ts" },
    {
      name: "chromium",
      testMatch: "**/*.browser.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `npm run start -- --hostname 127.0.0.1 --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
})
