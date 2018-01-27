import passwordChange from '../../modules/django/./views/passwordChange.vue'
import logout from '../../modules/django/./views/logout.vue'
import login from '../../modules/django/./views/login.vue'
import passwordChangeDone from '../../modules/django/./views/passwordChangeDone.vue'
import shortcut from '../../modules/django.contrib.contenttypes/./views/shortcut.vue'
import index from '../../modules/django/./views/index.vue'
import i18nJavascript from '../../modules/django/./views/i18nJavascript.vue'

export default [{
  path: '/',
  component: index,
  name: 'index',
}, {
  path: '/login/',
  component: login,
  name: 'login',
}, {
  path: '/logout/',
  component: logout,
  name: 'logout',
}, {
  path: '/password_change/',
  component: passwordChange,
  name: 'password_change',
}, {
  path: '/password_change/done/',
  component: passwordChangeDone,
  name: 'password_change_done',
}, {
  path: '/jsi18n/',
  component: i18nJavascript,
  name: 'jsi18n',
}, {
  path: '/r/:content_type_id/:object_id/',
  component: shortcut,
  name: 'view_on_site',
}];
