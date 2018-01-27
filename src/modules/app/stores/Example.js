import Vue from 'vue'
import MaxLengthValidator from '../../../validators/MaxLengthValidator'


const state = {
  objects: {
    all: {},
    master: {},
    new: {
      id: {
        value: '',
        errors: []
      },
      name: {
        value: '',
        errors: []
      },
      description: {
        value: '',
        errors: []
      },
    }
  },
  fields: {
    id: {
      validators: []
    },
    name: {
      validators: [
        MaxLengthValidator,
      ]
    },
    description: {
      validators: []
    },
  }
}

const getters = {
  getAll() {

  },

  getById() {

  },
}

const actions = {
  validate({ commit, state }, object) {
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
      commit('ACCEPT_CHANGES', { object })
    } else {
      commit('REJECT_CHANGES', { object, errors })
    }
  },
  revert({ commit, state }, object) {
    const master = state.getMaster(object.id)

    commit('SET_STATE', master)
  },
  getOrCreate({ commit, state }, id) {
    debugger
    console.log(state, id)
    return state.objects.all[id] || state.objects.new
  },
  list() { console.log('weee')},
  fetchData(a, b, c, d) {
    this.loading = true
    debugger
    let object = this.getOrCreate(this.$route.params.id)

    Object.assign(this, object)
    this.object = object
    this.loading = false
  },
  save({ commit, state }, object) {

    commit('ACCEPT_CHANGES', { object })
  },

  remove() {
    this.$store.commit('MODEL_EXAMPLE_DELETE')
  },

  revert() {
    this.$store.dispatch('MODEL_EXAMPLE_REVERT')
  },
  load({ commit, state }, object) {
    console.log('stuff', object)
    commit('LOAD_ALL', object)
  },
}

const mutations = {
  REJECT_CHANGES(state, { object, errors }) {
    for (const [name, _] of state.fields) {
      state.objects.all[object.id].errors = errors[name] || []
    }
  },

  ACCEPT_CHANGES(state, { object }) {
    for (const [key, field] of object) {
      field.errors = []
    }

    state.objects.all[object.id] = object
  },
  LOAD_ALL(state, objects) {
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
    console.log('data', data)
    Vue.set(state.objects, 'all', data)
  },
}

export default {
  namespaced: true,
  modules: {
    Example: {
      state,
      getters,
      actions,
      mutations,
    }
  }
}
