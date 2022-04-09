<template>
  <img class="inline-block" alt="Vue logo" src="../assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite + Vue Apollo + Tailwind" />
  {{ transactions }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '../components/HelloWorld.vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { getAllTransactions } from '../graphql/queries/getAllTransactions'
// import deleteWineMutation from './graphql/deleteWine.mutation.gql'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    const { result } = useQuery(getAllTransactions)
    const transactions = useResult(result, null, data => data.getAllTransactions)
    // const { mutate: deleteWine } = useMutation(deleteWineMutation)

    return { transactions }
  }
})
</script>