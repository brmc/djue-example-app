import api from './api'

function list ({commit, state}, path) {
  return api.get(path)
      .then(response => commit('LOAD_ALL', response.data))
      .catch(error => alert('error', error))
}

function retrieve ({commit, state}, path) {
  return api.get(path)
      .then(response => commit('LOAD_ONE', response.data))
      .catch(error => alert('error', error))
}

function create ({commit, state}, {url, payload}) {
  return api.post(url, payload)
      .then(response => commit('LOAD_ONE', response.data))
      .catch(error => {commit('LOAD_ERRORS', error)})
}

function update ({commit, state}, {url, payload}) {
  return api.put(url, payload)
      .then(response => commit('LOAD_ONE', response.data))
      .catch(errpr => commit('LOAD_ERRORS', error))
}

function destroy ({commit, state}, path) {
  api.delete(path, commit, 'DELETE')
}

function removeActiveObject ({commit, state}) {
  commit('REMOVE_ACTIVE_OBJECT')
}

export {
  create,
  update,
  retrieve,
  destroy,
  list,
  removeActiveObject,
}