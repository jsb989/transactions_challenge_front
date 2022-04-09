import gql from 'graphql-tag'

export const getAllTransactions = gql`
  query getAllTransactions {
    getAllTransactions {
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