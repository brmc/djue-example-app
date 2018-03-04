import Vue from 'vue'
import MaxLengthValidator from '../../../validators/MaxLengthValidator'
import {
  list,
  create,
  retrieve,
  destroy,
  update,
  softCommit,
  resetNew,
} from '../../../store/curdl'

const state = {
  objects: {
    active: null,
    all: {},
    master: {},
    errors: null,
    new: {
      id: {
        value: '',
        errors: [],
      },
      name: {
        value: '',
        errors: [],
      },
      description: {
        value: '',
        errors: [],
      },
    },
  },
  fields: {
    id: {
      validators: [],
    },
    name: {
      validators: [
        MaxLengthValidator,
      ],
    },
    description: {
      validators: [],
    },
  },
}

const getters = {
  getActiveOrNew (state) {
    return state.objects.active || state.objects.new
  },

}

const actions = {
  list,
  create,
  retrieve,
  destroy,
  update,
  softCommit,
  resetNew,
}

function loadFieldErrors (state, data) {
  let target = state.objects.active || state.objects.new

  for (const [field, errors] of Object.entries(data)) {
    Vue.set(target[field], 'errors', errors)
  }
}

function loadGeneralErrors(state, data) {
  Vue.set(state, 'errors', data)
}

function clearGeneralErrors (state) {
  return
  Vue.set(state, 'errors', null)
}

const mutations = {
  LOAD_ERRORS (state, error) {
    const response = error.response
    const data = response.data

    switch (response.status) {
      case 400:
        loadFieldErrors(state, data)
        break
      default:
        loadGeneralErrors(state, Object.values(data))
    }
  },
  LOAD_ALL (state, response) {
    let objects = response.data
    let data = {}
    for (let obj of objects) {
      let inner = {}
      for (let key of Object.getOwnPropertyNames(obj)) {
        inner[key] = {
          value: obj[key],
          errors: [],
        }
      }
      data[obj.id] = inner
    }
    let clone = Object.assign({}, data)
    Vue.set(state.objects, 'all', data)
    Vue.set(state.objects, 'master', clone)
    clearGeneralErrors(state)
  },
  LOAD_ONE (state, response) {
    let object = response.data
    let data = {}
    for (let key of Object.getOwnPropertyNames(object)) {
      data[key] = {
        value: object[key],
        errors: [],
      }
    }

    state.objects.active = data

    Vue.set(state.objects.all, data.id.value, data)
    Vue.set(state.objects.master, data.id.value, data)
    clearGeneralErrors(state)
  },
  REMOVE (state, response) {
    Vue.set(state.objects.all, state.objects.active.id.value, null)
    //Vue.set(state.objects.master, state.objects.active.id.value, null)
    state.objects.active = null
    clearGeneralErrors(state)
  },
  REMOVE_ACTIVE_OBJECT (state) {
    Vue.set(state.objects.all, state.objects.active.id.value,
        state.objects.active)
    state.objects.active = null
    clearGeneralErrors(state)
  },
  RESET_NEW (state) {
    for (let [name, field] of Object.entries(state.objects.new)) {
      Vue.set(field, 'value', null)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
