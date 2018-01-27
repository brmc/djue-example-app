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

export default {
  get(url, mutation,) {

  }
}