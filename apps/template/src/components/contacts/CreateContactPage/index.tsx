import { FooComponents, FooProviders } from '@shared/foo-module-a'
import { useNavigate } from 'react-router'

export const CreateContactPage = () => {
  const navigate = useNavigate()
  return (
    <FooProviders.FooProvider id="mock-foo-id">
      <FooComponents.FooSummary />
      <FooComponents.FooDetails />
      <button
        onClick={() => {
          navigate('/contacts')
        }}
      >
        Go to Page A
      </button>
    </FooProviders.FooProvider>
  )
}
