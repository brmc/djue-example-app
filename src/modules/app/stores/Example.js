import MaxLengthValidator from '../../../validators/MaxLengthValidator'
import actions from '../../../store/actions'
import mutations from '../../../store/mutations'

const state = {
  objects: {
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

export default {
  namespaced: true,
  state,
  getters: {},
  actions: Object.assign({}, actions),
  mutations: Object.assign({}, mutations),
}
