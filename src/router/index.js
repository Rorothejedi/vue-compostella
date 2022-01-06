import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Album from '../views/Album.vue'

const routes = [{
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/',
    component: Home,
    meta: {
      transition: 'slide-left'
    },
  },
  {
    path: '/album',
    component: Album,
    meta: {
      transition: 'slide-right'
    },
  },
  {
    path: '/album/:id',
    component: Album,
    meta: {
      transition: 'slide-right'
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router