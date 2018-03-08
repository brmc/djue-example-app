import api from './api'

function list ({commit, state}, path) {
  return api.get(path)
      .then(response => commit('LOAD_ALL', response))
      .catch(error => {
        commit('LOAD_ERRORS', error)
        return error
      })
}

function retrieve ({commit, state}, path) {
  return api.get(path)
      .then(response => commit('LOAD_ONE', response))
      .catch(error => {
        commit('LOAD_ERRORS', error)
        return error
      })
}

function create ({commit, state}, {url, payload}) {
  return api.post(url, payload)
      .then(response => {
        commit('LOAD_ONE', response)
        return response
      })
      .catch(error => {
        commit('LOAD_ERRORS', error)
        return error
      })
}

function update ({commit, state}, {url, payload}) {
  return api.put(url, payload)
      .then(response => commit('LOAD_ONE', response))
      .catch(error => commit('LOAD_ERRORS', error))
}

function destroy ({commit, state}, url) {
  return api.destroy(url)
      .then(response => commit('REMOVE', response))
      .catch(error => {
        commit('LOAD_ERRORS', error)
        return error
      })

}

function resetNew ({commit, state}) {
  commit('RESET_NEW', state)
}

function revert ({commit}, id) {
  commit('REVERT', id)
}

function pushHtmlError ({commit}, {field, id, error}) {
  commit('PUSH_FIELD_ERROR', {field, id, error})
}

function validateField ({commit}, {field, id}) {
  debugger
}

export {
  create,
  update,
  retrieve,
  destroy,
  list,
  resetNew,
  revert,
  pushHtmlError
}