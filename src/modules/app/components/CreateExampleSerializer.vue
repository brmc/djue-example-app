<script>
  import Vue from 'vue'
  import ExampleForm from './ExampleForm'
  import CreateViewSetComponent from '../../../components/CreateViewSetComponent'

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