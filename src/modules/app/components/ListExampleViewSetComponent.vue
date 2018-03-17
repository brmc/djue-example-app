<script>
  import Vue from 'vue'
  import ListViewSetComponent from '../../../components/ListViewSetComponent'

  export default Vue.extend({
    mixins: [ListViewSetComponent],
    data () {
      return {
        namespace: 'app/Example',
        routeName: 'example-list',
        detailRouteName: 'example-detail',
      }
    },
  })
</script>