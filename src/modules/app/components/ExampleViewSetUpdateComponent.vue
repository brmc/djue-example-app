<script>
  import Vue from 'vue'
  import UpdateViewSetComponent from '../../../components/UpdateViewSetComponent'
  import ExampleForm from './ExampleForm'

  export default Vue.extend({
    mixins: [UpdateViewSetComponent],
    components: {InstanceForm: ExampleForm},
    data () {
      return {
        namespace: 'app/Example',
        objectName: 'Example',
        routeName: 'example-detail',
      }
    },
  })
</script>