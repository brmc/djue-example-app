import APIRootView from '../../modules/rest_framework/./views/APIRootView.vue'
import ExampleViewSetList from './views/ExampleViewSetList.vue'
import ExampleViewSetInstance from './views/ExampleViewSetInstance.vue'

export default [{
  path: '/examples/',
  component: ExampleViewSetList,
  name: 'example-list',
}, {
  path: '/examples/:pk/',
  component: ExampleViewSetInstance,
  name: 'example-detail',
}, {
  path: '/',
  component: APIRootView,
  name: 'api-root',
}];
