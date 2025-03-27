import { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { useNavigate } from 'react-router'
import { navigateRoute, openNewPage } from '../utils/navigate'
import { getAvatarInitials } from '../utils/nav'
import { buildContactListPageURL } from '../components/contacts/buildContactListPageURL'
import { buildCreateContactPageURL } from '../components/contacts/buildCreateContactPageURL'
import { buildNewPageURL } from '../components/new/buildNewPageURL'

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes('contacts')) return 1
  if (pathname.includes('new-module')) return 2
  return 0
}

export const Nav: FC = () => {
  const { connectLogoutRedirect, connectIsDesktop, connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const navigate = useNavigate()

  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
    },
    {
      itemIndex: 1,
      text: 'Contacts',
      callback: navigateRoute(navigate, buildContactListPageURL()),
      subItems: [
        {
          itemIndex: 4,
          callback: navigateRoute(navigate, buildContactListPageURL()),
          text: 'List',
        },
        {
          itemIndex: 5,
          callback: navigateRoute(navigate, buildCreateContactPageURL()),
          text: 'New',
        },
      ],
    },
    {
      itemIndex: 2,
      text: 'New Page',
      callback: navigateRoute(navigate, buildNewPageURL()),
    },
  ]

  return (
    <NavResponsive
      options={navOptions}
      defaultNavIndex={getDefaultNavIndex(window.location.pathname)}
      appSwitcherOptions={[
        {
          text: 'AppMarket',
          callback: openNewPage('https://marketplace.reapit.cloud'),
          iconUrl: <Icon icon="reapitLogoSmall" />,
        },
        {
          text: 'DevPortal',
          callback: openNewPage('https://developers.reapit.cloud'),
          iconUrl: <Icon icon="reapitLogoSmall" />,
        },
      ]}
      avatarText={getAvatarInitials(connectSession)}
      avatarOptions={
        !connectIsDesktop
          ? [
              {
                callback: connectLogoutRedirect,
                text: 'Logout',
              },
            ]
          : undefined
      }
    />
  )
}

export default Nav
