import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '../views/BaseLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: BaseLayout,
      children: [
        // {
        //   path: '/login',
        //   name: 'login',
        //   component: () => import('../views/LoginView.vue')
        // },
        {
          path: '/front',
          name: 'front',
          component: () => import('../views/FrontPage.vue')
        },
        {
          path: '/projects',
          name: 'projects',
          component: () => import('../views/ProjectsList.vue')
        },
        {
          path: '/tags',
          name: 'tags',
          component: () => import('../views/TagsList.vue')
        }
      ]
    }
  ]
})

export default router
