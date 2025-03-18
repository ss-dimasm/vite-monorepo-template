import { Navigate, Outlet } from 'react-router-dom'
import { buildContactDetailPageURL } from '../buildContactDetailPageURL'

export const ViewContactDesktopRedirect = () => {
  const desktopContactCode = window['__REAPIT_MARKETPLACE_GLOBALS__']?.cntCode

  if (desktopContactCode && !window.location.pathname.includes(desktopContactCode)) {
    window['__REAPIT_MARKETPLACE_GLOBALS__'].cntCode = null
    return <Navigate to={buildContactDetailPageURL({ contactId: desktopContactCode })} replace />
  }

  return <Outlet />
}
