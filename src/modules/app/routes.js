import ExampleUpdateView from './views/ExampleUpdateView.vue'
import ExampleListView from './views/ExampleListView.vue'
import APIRootView from '../../modules/rest_framework/./views/APIRootView.vue'
import ExampleCreateView from './views/ExampleCreateView.vue'
import ExampleDeleteView from './views/ExampleDeleteView.vue'
import ExampleViewSetList from './views/ExampleViewSetList.vue'
import Index from './views/Index.vue'
import ExampleDetailView from './views/ExampleDetailView.vue'
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
  path: '/xx',
  component: APIRootView,
  name: 'api-root',
}, {
  path: '/Example/~create/',
  component: ExampleCreateView,
  name: 'Example_create',
}, {
  path: '/Example/:pk/~delete/',
  component: ExampleDeleteView,
  name: 'Example_delete',
}, {
  path: '/Example/:pk/',
  component: ExampleDetailView,
  name: 'Example_detail',
}, {
  path: '/Example/:pk/~update/',
  component: ExampleUpdateView,
  name: 'Example_update',
}, {
  path: '/Example',
  component: ExampleListView,
  name: 'Example_list',
}, {
  path: '/xxx',
  component: Index,
  name: '',
}];
