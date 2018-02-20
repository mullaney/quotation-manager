import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ViewQuote from '@/components/ViewQuote'
import NewQuote from '@/components/NewQuote'
import EditQuote from '@/components/EditQuote'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  }, 
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  }, 
  {
    path: '/new',
    name: 'new-quote',
    component: NewQuote,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:quote_id',
    name: 'edit-quote',
    component: EditQuote,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:quote_id',
    name: 'view-quote',
    component: ViewQuote,
    meta: {
      requiresAuth: true
    }
  }]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/dashboard',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router