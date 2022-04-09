import gql from 'graphql-tag'

export const getAllTransactions = gql`
  query getAllTransactions {
    getAllTransactions {
      id
    }
  }
`