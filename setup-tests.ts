import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest' // Use vi from Vitest instead of jest
import MockDate from 'mockdate'

// Mock the Date globally
MockDate.set(new Date('2023-01-01'))

// Mock environment variables for tests
Object.defineProperty(process, 'env', {
  value: {
    CONNECT_CLIENT_ID: 'MOCK_ID',
    CONNECT_OAUTH_URL: 'MOCK_ID',
    CONNECT_USER_POOL_ID: 'MOCK_ID',
    PLATFORM_API_URL: 'MOCK_ID',
    NODE_ENV: 'test',
  },
})

// Enable fetch mocks using Vitest's fetch mock system
vi.mock('node-fetch', async () => {
  const { Response } = await import('node-fetch')
  return {
    default: vi.fn().mockResolvedValue(new Response('{}')),
  }
})
