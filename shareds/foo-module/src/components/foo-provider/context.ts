import { createContext } from 'react'
import { FooContextModel } from './types'

export const FooContext = createContext<FooContextModel | null>(null)
