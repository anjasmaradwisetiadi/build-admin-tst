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
      meta: {requiresUnauth: true}
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/Dashboard.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/coupoun',
      name: 'coupoun',
      component: () => import('../views/coupoun/Coupoun.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/order/Order.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/order/:id',
      name: 'detail-order',
      component: () => import('../views/order/DetailOrder.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/profile/Profile.vue'),
      meta: {requiresAuth: true}
    },
    { path: '/:pathMatch(.*)*', component: () => import('../components/PageNotFound.vue'), meta: {requiresAuth: true}},
  ]
})

router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem('user') ? localStorage.getItem('user') : null
  const getToken = JSON.parse(userToken)
  const auth = to.meta.requiresAuth; 
  const unauth = to.meta.requiresUnauth; 

  if (auth && !getToken) {
    next('/login');
  } else if (unauth && getToken) {
    next('/dashboard');
  } else {
    next();
  }

})

export default router
