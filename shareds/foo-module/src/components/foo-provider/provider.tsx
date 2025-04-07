import { FC, PropsWithChildren } from 'react'
import { FooContext } from './context'
import { useFetchSingleFoo } from '../../hooks/use-fetch-single-foo'

interface Props {
  id: string
  shouldLoadBaz?: boolean
}

export const FooProvider: FC<PropsWithChildren<Props>> = ({ id, shouldLoadBaz, children }) => {
  const data = useFetchSingleFoo(id, {
    embedBaz: shouldLoadBaz,
  })

  return <FooContext.Provider value={data}>{children}</FooContext.Provider>
}
