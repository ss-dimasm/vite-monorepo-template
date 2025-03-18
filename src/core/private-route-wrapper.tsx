import { Suspense } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Nav } from './nav'
import { reapitConnectBrowserSession } from './connect-session'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { Loader, MainContainer, PageContainer } from '@reapit/elements'

export const PrivateRouteWrapper = () => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()

  if (!connectSession) {
    return (
      <MainContainer hasGreyBackground>
        <PageContainer>
          <Loader fullPage />
        </PageContainer>
      </MainContainer>
    )
  }

  if (connectInternalRedirect && location?.pathname !== connectInternalRedirect) {
    return <Navigate to={connectInternalRedirect} replace />
  }

  return (
    <MainContainer hasGreyBackground>
      <Nav />
      <Suspense fallback={<Loader fullPage />}>
        <Outlet />
      </Suspense>
    </MainContainer>
  )
}

export default PrivateRouteWrapper
