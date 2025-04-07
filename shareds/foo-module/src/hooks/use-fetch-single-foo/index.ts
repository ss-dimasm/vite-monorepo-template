interface UseFetchSingleFooOptions {
  embedBaz?: boolean
}

export const useFetchSingleFoo = (fooId: string, options: UseFetchSingleFooOptions) => {
  const { embedBaz } = options ?? {}

  return {
    data: fooId,
    isLoading: false,
    metadata: {
      bazEntity: embedBaz ? 'baz-entity' : null,
    },
  }
}
