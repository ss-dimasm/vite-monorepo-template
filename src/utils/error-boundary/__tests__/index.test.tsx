import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { ErrorBoundary } from '..'

const ThrowError = () => {
  throw new Error('Test error')
}

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>,
    ).asFragment()

    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('should catch errors and display fallback UI', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    ).asFragment()

    expect(screen.getByText('Something went wrong here, try refreshing your page.')).toBeInTheDocument()
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })

  it('should match snapshot when no error occurs', () => {
    const { asFragment } = render(
      <ErrorBoundary>
        <div>Snapshot Test</div>
      </ErrorBoundary>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot when an error occurs', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const { asFragment } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    )

    expect(asFragment()).toMatchSnapshot()
    consoleErrorSpy.mockRestore()
  })
})
