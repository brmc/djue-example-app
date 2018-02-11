import Vuex from 'vuex'
import AppStore from '../modules/app/stores/store'
import api from './api'
import Vue from 'vue'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    urls: [],
  },
  modules: {
    app: AppStore,
  },
  actions: {
    loadRoot ({commit, state}) {
      api.get('/.json')
          .then((response) => commit('LOAD_ROOT', response.data))
    },
  },
  mutations: {
    LOAD_ROOT (state, response) {
      const BASEURL = 'http://localhost:8000'

      if (!response) {
        return
      }

      let relativeUrls = {}

      for (const [name, url] of Object.entries(response)) {
        relativeUrls[name] = url.split(BASEURL).pop().replace('.json', '/')
      }

      Vue.set(state, 'urls', relativeUrls)
    },
    LOAD_ROOT_ERROR (state, error) {
      Vue.set(state, 'error', error)
    },
  },
})

export default store