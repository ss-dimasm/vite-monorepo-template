import { CreateContactPage } from './CreateContactPage'
import { ContactDetailPage } from './ContactDetailPage'
import { ContactListPage } from './ContactListPage'
import { ViewContactDesktopRedirect } from './ViewContactDesktopRedirect'

import type { RouteObject, LazyRouteFunction } from 'react-router-dom'

type LazyRouteProps = Awaited<ReturnType<LazyRouteFunction<RouteObject>>>

export const CreateContactPageRouteProps = {
  Component: CreateContactPage,
} as const satisfies LazyRouteProps

export const ContactDetailPageRouteProps = {
  Component: ContactDetailPage,
} as const satisfies LazyRouteProps

export const ContactListPageRouteProps = {
  Component: ContactListPage,
} as const satisfies LazyRouteProps

export const ViewContactDesktopRedirectRouteProps = {
  Component: ViewContactDesktopRedirect,
} as const satisfies LazyRouteProps
