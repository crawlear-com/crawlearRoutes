import { defineConfig } from "vitest/config";
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setupTests.ts", "./src/test/vitest-setup.ts"]
  },
})