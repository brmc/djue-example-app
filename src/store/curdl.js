import api from './api'
import { areEqual } from '../util'

function list ({commit, state}, path) {
  return api.get(path)
      .then(response => commit('LOAD_ALL', response))
      .catch(error => {
        commit('LOAD_ERRORS', error)
        return error
      })
}

function retrieve ({commit, state}, path) {
  const pk = path.params.pk
  const local = state.objects.all[pk]
  const master = state.objects.master[pk]
  const fields = Object.keys(state.fields)
  if (local && master && !areEqual(local, master, fields)) {
    return commit('LOAD_LOCAL', local)
  }

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
      .then(response => {
        commit('LOAD_ONE', response)
        return response
      })
      .catch(error => {
        commit('LOAD_ERRORS', error)
        return error
      })
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

function validateField ({commit}, {payload}) {
  commit('VALIDATE_FIELD', {payload})
}

export default {
  create,
  update,
  retrieve,
  destroy,
  list,
  resetNew,
  revert,
  validateField,
}