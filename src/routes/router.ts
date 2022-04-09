import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'

export const routerHistory = createWebHistory()

export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    {
      path: '/',
      component: Index,
    },
  ],
})