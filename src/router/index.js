import { createRouter, createWebHistory } from 'vue-router'

// Nprogress
import NProgress from 'nprogress'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start();
  }
  next();
})


router.afterEach(() => {
  NProgress.done();
})

export default router
