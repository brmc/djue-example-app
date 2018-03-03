import axios from 'axios'
import router from '../router'
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

function buildPath(stuff) {
  if (typeof stuff === 'string') {
    return stuff
  }

  if (typeof stuff !== 'object') {
    throw "You're trying to build a path from stupid stuff. You need to pass "
  }

  // .resolve() throws an error due to property descriptor limitations
  // so a clone is necessary
  const clone = Object.assign({}, stuff)

  return router.resolve(clone).location.path
}

export default {
  get (url) {
    url = buildPath(url)
    return axios.get(url, config)
  },
  post (url, payload) {
    url = buildPath(url)
    return axios.post(url, payload, config)
  },
  destroy (url) {
    url = buildPath(url)
    return axios.delete(url, config)
  },
  put (url, payload) {
    url = buildPath(url)
    return axios.put(url, payload, config)
  },
}