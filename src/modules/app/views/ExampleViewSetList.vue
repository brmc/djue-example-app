<script>
  import Vue from 'vue'

  import ViewSetList from '../../../views/ViewSetList'
  import ListExampleViewSetComponent from '.././components/ExampleViewSetListComponent.vue'
  import CreateExampleSerializer from '.././components/ExampleViewSetCreateComponent'

export default Vue.extend({
  mixins: [ViewSetList],
  components: {
    ListComponent: ListExampleViewSetComponent,
    CreateComponent: CreateExampleSerializer
  }
})

</script>

<style>
</style>