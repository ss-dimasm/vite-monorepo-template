import { Nav, getDefaultNavIndex } from '../nav'
import { render } from '../../scripts/tests'

vi.mock('@reapit/connect-session', () => ({
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {
        name: 'MOCK_NAME',
      },
    },
  }),
}))

vi.mock('../connect-session')

describe('Nav', () => {
  it('should match a snapshot', () => {
    window.location.pathname = '/'
    const wrapper = render(<Nav />)
    expect(wrapper.asFragment()).toMatchSnapshot()
  })
})

describe('getDefaultNavIndex', () => {
  const routes = [
    {
      route: '/contacts',
      index: 1,
    },
    {
      route: '/random-route',
      index: 0,
    },
  ]

  routes.forEach((route) => {
    it(`should correctly return the default nav index for ${route.route}`, () => {
      expect(getDefaultNavIndex(route.route)).toEqual(route.index)
    })
  })
})
