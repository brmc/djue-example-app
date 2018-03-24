import ExampleViewSetListComponent from './components/ExampleViewSetListComponent'
import ExampleViewSetInstance from './views/ExampleViewSetInstance.vue'
import ExampleCreateViewSetComponent from './components/ExampleViewSetCreateComponent'

export default [{
  path: '/examples/',
  pathToRegexpOptions: {strict: true},
  components: {
    nav: ExampleViewSetListComponent,
    default: ExampleCreateViewSetComponent
  },
  name: 'example-list',
}, {
  path: '/examples/:pk/',
  pathToRegexpOptions: {strict: true},
  components: {
    nav: ExampleViewSetListComponent,
    default: ExampleViewSetInstance
  },
  name: 'example-detail',
}];
