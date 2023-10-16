import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'
import 'jest-location-mock'
import MockDate from 'mockdate'

MockDate.set(new Date('2023-01-01'))

Object.defineProperty(process, 'env', {
  value: {
    CONNECT_CLIENT_ID: 'MOCK_ID',
    CONNECT_OAUTH_URL: 'MOCK_ID',
    CONNECT_USER_POOL_ID: 'MOCK_ID',
    PLATFORM_API_URL: 'MOCK_ID',
    NODE_ENV: 'test',
  },
})

jest.mock('@linaria/react', () => {
  const styled = (tag: any) => {
    return jest.fn(() => `mock-styled.${tag}`)
  }
  return {
    styled: new Proxy(styled, {
      get(o, prop) {
        return o(prop)
      },
    }),
  }
})

jest.mock('@linaria/core', () => {
  const css = (tag: any) => {
    return `mock-css.${tag}`
  }

  const { cx } = jest.requireActual('@linaria/core')

  return {
    cx,
    css,
  }
})

fetchMock.enableMocks()
