<script>
import Vue from 'vue'
import UpdateViewSetComponent from '../../../components/UpdateViewSetComponent'
import ExampleSerializer from './ExampleSerializer'

export default Vue.extend({
  mixins: [UpdateViewSetComponent],
  components: { InstanceForm: ExampleSerializer },
  data() {
    return {
      namespace: 'app/Example',
      objectName: 'Example',
      routeName: 'example-detail',
    }
  },
})
</script>
