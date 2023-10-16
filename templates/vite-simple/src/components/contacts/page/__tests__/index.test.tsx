import ContactsPage from '..'
import { render } from '../../../../scripts/tests'

describe('ContactsPage', () => {
  it('should match a snapshot', () => {
    expect(render(<ContactsPage />)).toMatchSnapshot()
  })
})
