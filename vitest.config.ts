import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/scripts/tests/setup-tests.ts'],
    coverage: {
      provider: 'v8',
    },
  },
})
