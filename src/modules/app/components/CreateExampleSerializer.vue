<script>
  import Vue from 'vue'
  import CreateViewSetComponent from '../../../components/CreateViewSetComponent'
  import ExampleForm from './ExampleForm'

  export default Vue.extend({
    mixins: [CreateViewSetComponent],
    components: {InstanceForm: ExampleForm},
    data () {
      return {
        namespace: 'app/Example',
        objectName: 'Example',
        routeName: 'example-list',
      }
    },
  })
</script>