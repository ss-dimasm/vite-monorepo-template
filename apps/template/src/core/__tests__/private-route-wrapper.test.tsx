import { render, screen } from '@testing-library/react'
import { useReapitConnect } from '@reapit/connect-session'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router'
import { PrivateRouteWrapper } from '../private-route-wrapper'
import { Mock } from 'vitest'

vi.mock('../connect-session')
vi.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: vi.fn(),
  useReapitConnect: vi.fn(() => ({
    connectSession: {
      loginIdentity: {
        name: 'MOCK_NAME',
      },
    },
    connectInternalRedirect: '',
  })),
}))
vi.mock('react-router', async () => ({
  ...(await vi.importActual('react-router')),
  redirect: vi.fn(),
}))

const mockUseReapitConnect = useReapitConnect as Mock
const queryClient = new QueryClient()

const createWrapper = (children) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackProvider>
        <MediaStateProvider>
          <NavStateProvider>
            <MemoryRouter>
              <Routes>
                <Route path="/" element={children} />
                <Route path="/foo" element="Foo" />
              </Routes>
            </MemoryRouter>
          </NavStateProvider>
        </MediaStateProvider>
      </SnackProvider>
    </QueryClientProvider>
  )
}

describe('PrivateRouteWrapper', () => {
  it('should match a snapshot', () => {
    expect(render(createWrapper(<PrivateRouteWrapper />))).toMatchSnapshot()
  })

  it('should match a snapshot where there is no session', () => {
    mockUseReapitConnect.mockReturnValueOnce({})
    expect(render(createWrapper(<PrivateRouteWrapper />))).toMatchSnapshot()
  })

  it('should redirect if required', () => {
    mockUseReapitConnect.mockReturnValueOnce({
      connectInternalRedirect: '/foo',
      connectSession: {
        loginIdentity: {},
      },
    })

    render(createWrapper(<PrivateRouteWrapper />))

    expect(screen.getByText('Foo')).toBeInTheDocument()
  })
})
