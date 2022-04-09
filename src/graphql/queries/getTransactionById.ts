import gql from 'graphql-tag'

export const getTransactionById = gql`
  query getTransactionById($id: ID!) {
    getTransactionById(id: $id) {
      id
      account
      description
      category
      reference
      currency
      amount
      status
      transactionDate
      createdAt
      updatedAt
    }
  }
`