<template>
  <div>
    {{ transaction }}
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