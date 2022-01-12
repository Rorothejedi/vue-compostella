import {
  createRouter,
  createWebHistory
} from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Album from '../views/Album.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/private/Dashboard.vue'

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next('/dashboard')

    return
  }
  next()
}

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next('/admin')
    return
  }
  next()
}

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
    props: {
      darkTheme: false
    }
  },
  {
    path: '/album',
    component: Album,
    meta: {
      transition: 'slide-right'
    },
    props: {
      darkTheme: false
    }
  },
  {
    path: '/album/:id',
    component: Album,
    meta: {
      transition: 'slide-right'
    },
    props: {
      darkTheme: false
    }
  },
  {
    path: '/admin',
    component: Login,
    beforeEnter: ifAuthenticated,
    meta: {
      transition: 'slide-right'
    },
    props: {
      darkTheme: true
    }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: ifNotAuthenticated,
    props: {
      darkTheme: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  const darkTheme = to.matched[0].props.default.darkTheme

  document.body.style.backgroundColor = darkTheme ?
    "var(--dark-bg-color)" :
    "var(--main-bg-color)";
});

export default router