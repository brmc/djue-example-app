<script>
  import Vue from 'vue'

  import ViewSetInstance from '../../../views/ViewSetInstance'
  import DestroyExampleViewSetComponent from '.././components/ExampleViewSetDestroyComponent'
  import UpdateExampleSerializer from '.././components/ExampleViewSetUpdate.vue'
  import RetrieveExampleViewSetComponent from '.././components/ExampleViewSetRetrieveComponent.vue'

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