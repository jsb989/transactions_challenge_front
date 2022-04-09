<template>
  <img class="inline-block" alt="Vue logo" src="../assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite + Vue Apollo + Tailwind" /> -->
  <MyTable :fields="fields" :data="transactions" stripped/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '../components/HelloWorld.vue'
import MyTable from '../components/MyTable.vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { getAllTransactions } from '../graphql/queries/getAllTransactions'
// import deleteWineMutation from './graphql/deleteWine.mutation.gql'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    MyTable,
  },
  setup() {
    const { result } = useQuery(getAllTransactions)
    const transactions = useResult(result, null, data => data.getAllTransactions)
    const fields = [
      { key: 'id', label: 'id' },
      { key: 'account', label: 'account' },
      { key: 'description', label: 'description' },
      { key: 'category', label: 'category' },
      { key: 'reference', label: 'reference' },
      { key: 'currency', label: 'currency' },
      { key: 'amount', label: 'amount' },
      { key: 'status', label: 'status' },
      { key: 'transactionDate', label: 'transactionDate' },
      { key: 'createdAt', label: 'createdAt' },
      { key: 'updatedAt', label: 'updatedAt' },
    ]
    // const { mutate: deleteWine } = useMutation(deleteWineMutation)

    return { transactions, fields }
  }
})
</script>