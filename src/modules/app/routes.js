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
}];
