import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/Dashboard.vue'),
    },
    {
      path: '/coupoun',
      name: 'coupoun',
      component: () => import('../views/coupoun/Coupoun.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/order/Order.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // },
    { path: '/:pathMatch(.*)*', component: () => import('../components/PageNotFound.vue')},
  ]
})

export default router
