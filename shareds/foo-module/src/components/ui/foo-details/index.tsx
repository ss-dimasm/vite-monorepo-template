import { useFooProvider } from '../../foo-provider'

export const FooDetails = () => {
  const { metadata } = useFooProvider()

  return <pre>{JSON.stringify(metadata)}</pre>
}
