import { mockContactModel } from '../../../../scripts/stubs'
import { render } from '../../../../scripts/tests'
import { ContactQuickView } from '../contact-quick-view'

describe('ContactQuickView', () => {
  it('should match a snapshot with data', () => {
    expect(render(<ContactQuickView contact={mockContactModel} />).asFragment()).toMatchSnapshot()
  })
})
