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
            v-model.startDate="variables.startDate"
          />
          <label class="mr-2 ml-2 pt-1 text-sm">Até</label>
          <input
            type="date"
            id="periodTo-created_at__lte"
            class="h-10 px-3 bg-gray-100 placeholder-gray-600 border-azul rounded-lg focus:ring-azul focus:border-azul"
            label="Até"
            v-model.endDate="variables.endDate"
          />
        </div>
      </div>
      <button
        @click="refetch"
        type="button"
        class="px-3 ml-1 h-10 text-center bg-azul rounded-lg text-white text-sm hover:bg-blue-900"
      >
        Filtrar
      </button>
    </div>

    <MyTable :fields="fields" :data="transactions" stripped>
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
import { computed, defineComponent, ref, reactive } from 'vue'
import MyTable from '../components/MyTable.vue'
import { Transactions } from '../models/transactions'
import { useQuery, useResult } from '@vue/apollo-composable'
import { getTransactionsByDate } from '../graphql/queries/getTransactionsByDate'

export default defineComponent({
  name: 'App',
  components: {
    MyTable,
  },
  setup() {
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
    
    const variables = reactive({
      startDate: '',
      endDate: ''
    })

    const { result, loading, refetch } = useQuery(getTransactionsByDate, variables)

    const transactions = computed((): Array<Transactions> => {
      return result.value?.getTransactionsByDate || [];
    });

    return { transactions, loading, fields, refetch, variables }
  },
  methods: {
    enterDetails(item: any) {
      this.$router.push(`/transactions/details/${item.id}`)
    },
  }
})
</script>