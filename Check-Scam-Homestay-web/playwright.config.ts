import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        baseURL: 'http://localhost:3000',
        launchOptions: {
          slowMo: 1, // Làm chậm mỗi thao tác 1000ms để dễ quan sát
        },
      },
    },
  ],
});
