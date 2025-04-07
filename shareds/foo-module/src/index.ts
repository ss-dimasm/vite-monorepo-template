import { FooProvider } from './components/foo-provider'
import { FooDetails } from './components/ui/foo-details'
import { FooSummary } from './components/ui/foo-summary'

export const FooProviders = {
  FooProvider,
}

// NOTE: could lazy load these components
export const FooComponents = {
  FooSummary,
  FooDetails,
}
