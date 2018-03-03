import APIRootView from '../../modules/rest_framework/./views/APIRootView.vue'
import ExampleViewSetList from './views/ExampleViewSetList.vue'
import ListExampleViewSetComponent from './components/ListExampleViewSetComponent'
import ExampleViewSetInstance from './views/ExampleViewSetInstance.vue'
import CreateExampleSerializer from './components/CreateExampleSerializer'

export default [{
  path: '/examples/',
  pathToRegexpOptions: {strict: true},
  components: {
    nav: ListExampleViewSetComponent,
    default: CreateExampleSerializer
  },
  name: 'example-list',
}, {
  path: '/examples/:pk/',
  pathToRegexpOptions: {strict: true},
  components: {
    nav: ListExampleViewSetComponent,
    default: ExampleViewSetInstance
  },
  name: 'example-detail',
}, {
  path: '/',
  pathToRegexpOptions: {strict: true},
  component: APIRootView,
  name: 'api-root',
}];
