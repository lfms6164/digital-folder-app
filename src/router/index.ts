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
          path: '/project/:id',
          name: 'project',
          component: () => import('../views/ProjectView.vue'),
          props: true
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
