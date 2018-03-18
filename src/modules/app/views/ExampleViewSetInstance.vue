<script>
  import Vue from 'vue'

  import ViewSetInstance from '../../../views/ViewSetInstance'
  import DestroyExampleViewSetComponent from '.././components/DestroyExampleViewSetComponent.vue'
  import UpdateExampleSerializer from '.././components/UpdateExampleSerializer.vue'
  import RetrieveExampleViewSetComponent from '.././components/RetrieveExampleViewSetComponent.vue'

  export default Vue.extend({
    mixins: [ViewSetInstance],
    data () {
      return {
        namespace: 'app/Example',
        routeName: 'example-detail'
      }
    },
    components: {
      UpdateComponent: UpdateExampleSerializer,
      RetrieveComponent: RetrieveExampleViewSetComponent,
      DestroyComponent: DestroyExampleViewSetComponent,
    },
  })
</script>