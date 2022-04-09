import gql from 'graphql-tag'

export const getTransactionsByDate = gql`
  query getTransactionsByDate($startDate: String!, $endDate: String!) {
    getTransactionsByDate(startDate: $startDate, endDate: $endDate) {
      id
      account
      description
      category
      reference
      currency
      amount
      status
      transactionDate
    }
  }
`