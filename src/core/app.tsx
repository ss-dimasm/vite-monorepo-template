import '@reapit/elements/dist/index.css'
import { FC, StrictMode } from 'react'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from '../utils/error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from '../routes'

const queryClient = new QueryClient()
const router = createBrowserRouter(routes)

const App: FC = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <SnackProvider>
          <NavStateProvider>
            <MediaStateProvider>
              <RouterProvider router={router} />
            </MediaStateProvider>
          </NavStateProvider>
        </SnackProvider>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)

export default App
