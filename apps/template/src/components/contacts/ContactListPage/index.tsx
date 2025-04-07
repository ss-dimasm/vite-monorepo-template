import { FooComponents, FooProviders } from '@shared/foo-module'
import { useNavigate } from 'react-router'

export const ContactListPage = () => {
  const navigate = useNavigate()
  return (
    <FooProviders.FooProvider id="mock-foo-id" shouldLoadBaz>
      <FooComponents.FooSummary />
      <FooComponents.FooDetails />
      <button
        onClick={() => {
          navigate('/contacts/new')
        }}
      >
        Go to Page B
      </button>
    </FooProviders.FooProvider>
  )
}
