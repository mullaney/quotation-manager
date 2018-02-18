import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import ViewQuote from '@/components/ViewQuote'
import NewQuote from '@/components/NewQuote'
import EditQuote from '@/components/EditQuote'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'dashboard',
    component: Dashboard
  }, {
    path: '/new',
    name: 'new-quote',
    component: NewQuote
  },
  {
    path: '/edit/:id',
    name: 'edit-quote',
    component: EditQuote
  },
  {
    path: '/:id',
    name: 'view-quote',
    component: ViewQuote
  }]
})
