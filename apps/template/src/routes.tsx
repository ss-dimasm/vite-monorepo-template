import { createRoutesFromElements, Navigate, Route } from 'react-router-dom'
import { LoginPage } from './components/LoginPage'
import PrivateRouteWrapper from './core/private-route-wrapper'

export const routes = createRoutesFromElements(
  <Route path="/">
    <Route index element={<Navigate to={`contacts${globalThis.location.search}`} replace />} />
    <Route path="login" element={<LoginPage />} />
    <Route element={<PrivateRouteWrapper />}>
      <Route
        path="contacts"
        lazy={async () => (await import('./components/contacts/routeProps')).ViewContactDesktopRedirectRouteProps}
      >
        <Route index lazy={async () => (await import('./components/contacts/routeProps')).ContactListPageRouteProps} />
        <Route
          path="new"
          lazy={async () => (await import('./components/contacts/routeProps')).CreateContactPageRouteProps}
        />
        <Route path=":contactId">
          <Route index element={<Navigate to="overview" replace />} />
          <Route
            path="*"
            lazy={async () => (await import('./components/contacts/routeProps')).ContactDetailPageRouteProps}
          />
        </Route>
      </Route>
      <Route path="new-page" lazy={async () => (await import('./components/new/routeProps')).NewPagePageRouteProps} />
    </Route>
  </Route>,
)
