<template>
  <div v-if="loading" class="mx-4">
    Loading data
  </div>
  <div v-else class="mx-4">
    <div class="flex flex-wrap space-y-4 md:space-y-0 items-center justify-center">
      <!-- Inicio do Filtro de Criação -->
      <div class="w-full xl:w-1/3 mb-4">
        <Datepicker 
          v-model="date" 
          @update:modelValue="onChangeDatePicker" 
          range 
          :partialRange="false"
          :enableTimePicker="false"
        />
        
      </div>
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
import { computed, onMounted, defineComponent, ref, reactive } from 'vue'
import MyTable from '../components/MyTable.vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { Transactions } from '../models/transactions'
import { useQuery } from '@vue/apollo-composable'
import { getTransactionsByDate } from '../graphql/queries/getTransactionsByDate'

export default defineComponent({
  name: 'App',
  components: {
    MyTable,
    Datepicker,
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

    const date = ref()

    onMounted(() => {
      const startDate = '';
      const endDate = '';
      date.value = [startDate, endDate];
    })

    const onChangeDatePicker = (value: Date[]): void => {
      variables.startDate = value[0].toISOString().split('T')[0]
      variables.endDate = value[1].toISOString().split('T')[0]
    };

    const transactions = computed((): Array<Transactions> => {
      return result.value?.getTransactionsByDate || [];
    });

    return { transactions, loading, fields, refetch, date, onChangeDatePicker}
  },
  methods: {
    enterDetails(item: any) {
      this.$router.push(`/transactions/details/${item.id}`)
    },
  }
})
</script>