<script>
import Vue from 'vue'
import CreateViewSetComponent from '../../../components/CreateViewSetComponent'
import ExampleSerializer from './ExampleSerializer'

export default Vue.extend({
  mixins: [CreateViewSetComponent],
  components: { InstanceForm: ExampleSerializer },
  data() {
    return {
      namespace: 'app/Example',
      objectName: 'Example',
      routeName: 'example-list',
    }
  },
})
</script>
