import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import store from './store/root'
import router from './router'

Vue.use(Router)

if (!window.location.origin) {
  window.location.origin = window.location.protocol + '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '')
}

new Vue({
  el: '#app',
  router,
  store,
  ...App,
})

window.store = store
