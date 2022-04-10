<template>
  <div class="container mx-auto space-y-4 md:space-y-0">
    <div >
      <div class="md:flex-1 p-4 rounded-lg bg-white bg-gray-100 border-t-4 border-imobanco">
        <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">
          Transaction Details
        </h1>
        <h3 class="text-gray-600 font-lg text-semibold leading-6">{{ getTituloID }}</h3>

        <ul
          class="bg-gray-100 text-gray-600 py-2 px-3 mt-3 divide-y rounded shadow-sm"
        >
          <li v-for="(value, name, index) in transaction" class="flex items-center py-3 hover:text-gray-700 hover:uppercase">
            <span>{{ name }} </span>
            <span class="ml-auto">
              <span class="bg-imobanco py-1 px-2 rounded text-azul text-sm">
                {{ value }}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>  
  </div>
  <div>
    <button
      class="py-2 px-4 text-center rounded-lg text-sm"
      @click="$router.back()"
    >
      Back
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from "vue-router";
import { useQuery, useResult } from '@vue/apollo-composable'
import { getTransactionById } from '../graphql/queries/getTransactionById'

export default defineComponent({
  name: 'App',
  setup() {
    const { id } = useRoute().params;
    const { result } = useQuery(getTransactionById, {
      id
    })
    const transaction = useResult(result, null, data => data.getTransactionById)

    return { transaction }
  },
})
</script>