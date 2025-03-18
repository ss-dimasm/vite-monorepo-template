import { NewPage } from './NewPage'

import type { RouteObject, LazyRouteFunction } from 'react-router-dom'

type LazyRouteProps = Awaited<ReturnType<LazyRouteFunction<RouteObject>>>

export const NewPagePageRouteProps = {
  Component: NewPage,
} as const satisfies LazyRouteProps
