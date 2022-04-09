import { ApolloClient, createHttpLink, HttpOptions, InMemoryCache } from '@apollo/client/core'

const createLink = (opts: HttpOptions = {}) => {
  return createHttpLink({ uri: 'http://localhost:4000/graphql', ...opts })
}

const cache = new InMemoryCache({})

// Create the apollo client
export const apolloClient = new ApolloClient({
  cache,
  link: createLink(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})