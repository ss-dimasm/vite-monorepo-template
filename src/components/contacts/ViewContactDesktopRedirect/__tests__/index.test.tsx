import { ViewContactDesktopRedirect } from '..'
import { render } from '../../../../scripts/tests'

describe('ViewContactDesktopRedirect', () => {
  it('should match a snapshot', () => {
    expect(render(<ViewContactDesktopRedirect />).asFragment()).toMatchSnapshot()
  })
})
