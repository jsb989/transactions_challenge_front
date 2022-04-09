import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'
import TransactionmDetails from '../pages/transactionDetails.vue'

export const routerHistory = createWebHistory()

export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/transactions/details/:id',
      component: TransactionmDetails,
    },
  ],
})