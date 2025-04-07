import { useContext } from 'react'
import { FooContext } from './context'

export const useFooProvider = () => {
  const ctx = useContext(FooContext)

  if (!ctx) {
    throw new Error('useFooProvider must be used within a FooProvider')
  }

  return ctx
}
