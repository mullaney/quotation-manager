import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ViewQuote from '@/components/ViewQuote'
import NewQuote from '@/components/NewQuote'
import EditQuote from '@/components/EditQuote'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }, 
  {
    path: '/register',
    name: 'register',
    component: Register
  }, 
  {
    path: '/new',
    name: 'new-quote',
    component: NewQuote
  },
  {
    path: '/edit/:quote_id',
    name: 'edit-quote',
    component: EditQuote
  },
  {
    path: '/:quote_id',
    name: 'view-quote',
    component: ViewQuote
  }]
})
