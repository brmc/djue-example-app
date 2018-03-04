<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'

  import DestroyViewSetComponent from '../../../components/DestroyViewSetComponent'

  export default Vue.extend({
    mixins: [DestroyViewSetComponent],
    data () {
      return {
        namespace: 'app/Example',
      }
    },
    computed: {
      routeDescription () {
        return {
          name: 'example-detail',
          params: {
            pk: this.object.id.value,
          },
        }
      },
    },
  })
</script>

<style>
</style>