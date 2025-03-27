import { LoginPage } from '..'
import { render } from '@testing-library/react'

describe('Login', () => {
  it('should match a snapshot', () => {
    process.env.VITE_APP_ENV = 'development'
    expect(render(<LoginPage />).asFragment()).toMatchSnapshot()
  })
})
