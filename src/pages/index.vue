<template>
  <div v-if="loading" class="mx-4">
    Loading data
  </div>
  <div v-else>
    <div class="flex flex-wrap space-y-4 md:space-y-0">
      <!-- Inicio do Filtro de Criação -->
      <div class="w-full xl:w-1/3 mb-4">
        <label class="mr-2 pt-1 text-sm">Data:</label>
        <div>
          <label class="mr-2 pt-1 text-sm">Start</label>
          <input
            id="periodFrom-created_at__gte"
            label="De"
            type="date"
            class="h-10 px-3 bg-gray-100 placeholder-gray-600 border-azul rounded-lg focus:ring-azul focus:border-azul"
            v-model="start"
          />
          <label class="mr-2 ml-2 pt-1 text-sm">Até</label>
          <input
            type="date"
            id="periodTo-created_at__lte"
            class="h-10 px-3 bg-gray-100 placeholder-gray-600 border-azul rounded-lg focus:ring-azul focus:border-azul"
            label="Até"
            v-model="end"
          />
        </div>
      </div>
      <button
        @click="filterTransactionsByDate(start, end)"
        type="button"
        class="px-3 ml-1 h-10 text-center bg-azul rounded-lg text-white text-sm hover:bg-blue-900"
      >
        Filtrar
      </button>
    </div>

    <MyTable :fields="fields" :data="transactions" stripped :key="redraw.value">
      <template #cell(transactionDate)="{ item }">
        {{ item.transactionDate.split('T')[0] }}
      </template>
      <template #cell(actions)="{ item }">
         <button
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 group hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            @click="enterDetails(item)"
          >
            Details
          </button>
      </template>
    </MyTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyTable from '../components/MyTable.vue'
import { apolloClient } from '../graphql/client'
import { useQuery, useLazyQuery, useResult } from '@vue/apollo-composable'
import { getAllTransactions } from '../graphql/queries/getAllTransactions'
import { getTransactionsByDate } from '../graphql/queries/getTransactionsByDate'

export default defineComponent({
  name: 'App',
  components: {
    MyTable,
  },
  setup() {
    const { result, loading } = useQuery(getAllTransactions)
    // console.log(result)
    let transactions = ref(useResult(result, null, data => data.getAllTransactions))
    const fields = [
      { key: 'account', label: 'account' },
      { key: 'description', label: 'description' },
      { key: 'category', label: 'category' },
      { key: 'reference', label: 'reference' },
      { key: 'currency', label: 'currency' },
      { key: 'amount', label: 'amount' },
      { key: 'status', label: 'status' },
      { key: 'transactionDate', label: 'transaction date' },
      { key: 'actions', label: '' },
    ]
    let start = ''
    let end = ''
    let redraw = ref(0)

    async function filterTransactionsByDate(startDate: string, endDate: string) {
      console.log(startDate, endDate)
      const result = await apolloClient.query({
        query: getTransactionsByDate,
        variables: {
          startDate,
          endDate,
        }
      })
      redraw.value++
      transactions = useResult(result.data)
      console.log(transactions)
    }
    console.log(transactions)
    return { transactions, loading, fields, start, end, redraw, filterTransactionsByDate}
  },
  methods: {
    enterDetails(item: any) {
      this.$router.push(`/transactions/details/${item.id}`)
    },
  }
})
</script>