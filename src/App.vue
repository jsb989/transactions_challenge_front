
<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import { apolloClient } from './graphql/client'
import { DefaultApolloClient } from '@vue/apollo-composable'

export default defineComponent({
  name: 'App',
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
