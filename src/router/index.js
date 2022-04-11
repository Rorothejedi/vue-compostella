import {
  createRouter,
  createWebHistory
} from 'vue-router'
import store from '@/store'
import Home from '@/views/Home.vue'
import Album from '@/views/Album.vue'
import Legal from '@/views/Legal.vue'
import Login from '@/views/Login.vue'
import AlbumsManage from '@/views/private/AlbumsManage.vue'
import AlbumEdit from '@/views/private/AlbumEdit.vue'
import CommentsReport from '@/views/private/CommentsReport.vue'

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next('/')

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
      transition: 'slide-left',
    },
    props: {
      admin: false
    }
  },
  {
    path: '/album/:id',
    component: Album,
    meta: {
      transition: 'slide-right'
    },
    props: {
      admin: false
    },
  },
  {
    path: '/legal',
    component: Legal,
    meta: {
      transition: 'slide-right'
    },
    props: {
      admin: false
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
      admin: true
    }
  },
  {
    path: '/albums-manage',
    component: AlbumsManage,
    beforeEnter: ifNotAuthenticated,
    meta: {
      transition: 'slide-right'
    },
    props: {
      admin: true
    },
  },
  {
    path: '/album-edit/:id',
    component: AlbumEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      transition: 'slide-right'
    },
    props: {
      admin: true
    },
  },
  {
    path: '/comments-report/',
    component: CommentsReport,
    beforeEnter: ifNotAuthenticated,
    meta: {
      transition: 'slide-right'
    },
    props: {
      admin: true
    },
  }
]

const scrollBehavior = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        top: 0
      })
    }, 300)
  })
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
})

router.afterEach((to) => {
  if (store.getters.darkTheme || to.matched[0].props.default.admin) {
    document.body.classList.add("dark-theme");
  }
  if (!store.getters.darkTheme && !to.matched[0].props.default.admin) {
    document.body.classList.remove("dark-theme");
  }
});

export default router