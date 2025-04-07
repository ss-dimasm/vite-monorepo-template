import { useFooProvider } from '../../foo-provider'

export const FooSummary = () => {
  const { data } = useFooProvider()

  return <h1>Foo Summary Id - {data}</h1>
}
