import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import routes from './modules/app/routes'
import store from './store/root'

Vue.use(Router)

if (!window.location.origin) {
  window.location.origin = window.location.protocol + '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '')
}

let router = new Router({
  routes: routes,
})

new Vue({
  el: '#app',
  router,
  store,
  ...App,
})
window.store = store
