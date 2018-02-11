import Vue from 'vue'
import MaxLengthValidator from '../../../validators/MaxLengthValidator'
import { list, create, retrieve, destroy, update, removeActiveObject } from '../../../store/curdl'

const state = {
  objects: {
    active: null,
    all: {},
    master: {},
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
  getActiveOrNew(state) {
    return state.objects.active || state.objects.new
  }

}

const actions = {
  list,
  create,
  retrieve,
  destroy,
  update,
  removeActiveObject,
  validate ({commit, state}, object) {
    let errors = {}
    let isValid = true
    for (const [name, value] of object) {
      let messages = []
      for (let validator of state.fields[name].validators) {
        validator = new validator(value)

        if (validator.isValid()) {
          continue
        }
        isValid = false
        messages.push(validator.message)
      }

      if (messages.length === 0) {
        continue
      }
      errors[name] = messages
    }

    if (isValid) {
      commit('ACCEPT_CHANGES', {object})
    } else {
      commit('REJECT_CHANGES', {object, errors})
    }
  },
  revert ({commit, state}, object) {
    const master = state.getMaster(object.id)

    commit('SET_STATE', master)
  },
  object ({commit, state}, id) {
    return state.object.all[id]
  },
  save ({commit, state}, object) {
    commit('ACCEPT_CHANGES', {object})
  },

  remove () {
    this.$store.commit('MODEL_EXAMPLE_DELETE')
  },

  revert () {
    this.$store.dispatch('MODEL_EXAMPLE_REVERT')
  },
  load ({commit, state}, object) {
    commit('LOAD_ALL', object)
  },
}

const mutations = {
  LOAD_ERRORS (state, error) {
    const data = error.response.data
    let target = state.objects.active || state.objects.new

    for (const [field, errors] of Object.entries(data)) {
      Vue.set(target[field], 'errors', errors)
    }
  },
  ACCEPT_CHANGES (state, {object}) {
    for (const [key, field] of object) {
      field.errors = []
    }

    state.objects.all[object.id] = object
  },
  LOAD_ALL (state, objects) {
    let data = []
    for (let obj of objects) {
      let inner = {}
      for (let key of Object.getOwnPropertyNames(obj)) {
        inner[key] = {
          value: obj[key],
          errors: [],
        }
      }
      data.push(inner)
    }
    Vue.set(state.objects, 'all', data)
    Vue.set(state.objects, 'master', data)
  },
  LOAD_ONE (state, object) {
    let data = {}
    for (let key of Object.getOwnPropertyNames(object)) {
      data[key] = {
        value: object[key],
        errors: [],
      }
    }

    Vue.set(state.objects, 'active', data)
    Vue.set(state.objects.all, data.id.value, data)
    Vue.set(state.objects.master, data.id.value, data)
  },
  CREATE (state, data) {
    Vue.set(state.objects, 'active', data)
    Vue.set(state.objects.all, data.id.value, data)
    Vue.set(state.objects.master, data.id.value, data)
  },
  REMOVE_ACTIVE_OBJECT (state) {
    Vue.set(state.objects, 'active', null)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
