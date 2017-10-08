import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import SignIn from '../components/SignIn'
import Settings from '../components/Settings'
import Statistics from '../components/Statistics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/sign_in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics
    }
  ]
})
