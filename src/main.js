import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import App from './App.vue'
import AppStore from './modules/app/stores/store'
import axios from 'axios'
import routes from './modules/app/routes'

Vue.use(Vuex)
Vue.use(Router)

if (!window.location.origin) {
  window.location.origin = window.location.protocol + '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '')
}

let router = new Router({
  routes: routes,
})

let store = new Vuex.Store({
  state: {
    urls: [],
  },
  getters: {
    pussy () {
      return 1
    },
  },
  modules: {
    app: AppStore,
  },
  actions: {
    loadRoot ({commit, state}) {
      const BASEURL = 'http://localhost:8000'

      let config = {
        baseURL: BASEURL,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        timeout: 1000,
        withCredentials: false, // default
        responseType: 'text', // default
        xsrfCookieName: 'csrftoken', // default
        xsrfHeaderName: 'X-XSRF-TOKEN', // default
        onUploadProgress (progressEvent) {},
        onDownloadProgress: function (progressEvent) {},
        // `maxContentLength` defines the max size of the http response content allowed
        maxContentLength: 2000,

        validateStatus: function (status) {
          return status >= 200 && status < 300 // default
        },
      }

      axios.get('/.json', config).catch(function (error) {
        commit('LOAD_ROOT_ERROR', "something went wrong")
      }).then(function (response) {
        if (!response) {
          return
        }

        let relativeUrls = {}

        for (const [name, url] of Object.entries(response.data)) {
          relativeUrls[name] = url.split(BASEURL).pop().replace('.json', '/')
        }

        commit('LOAD_ROOT', relativeUrls)
      })
    },
  },
  mutations: {
    LOAD_ROOT (state, urls) {
      Vue.set(state, 'urls', urls)
    },
    LOAD_ROOT_ERROR (state, error) {
      Vue.set(state, 'error', error)
    }
  },
})

new Vue({
  el: '#app',
  router,
  store,
  ...App,
})


//axios.get('/examples.json', a).catch(function (error) {
//  console.log(error)
//}).then(function (response) {
//  window.store = store
//  store.dispatch('app/load', response.data)
//})

