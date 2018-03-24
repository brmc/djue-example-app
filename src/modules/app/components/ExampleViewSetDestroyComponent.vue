<script>
import Vue from 'vue'
import { mapState } from 'vuex'

import DestroyViewSetComponent from '../../../components/DestroyViewSetComponent'

export default Vue.extend({
  mixins: [DestroyViewSetComponent],
  data() {
    return {
      namespace: 'app/Example',
      routeName: 'example-detail',
    }
  },
  computed: {
    ...mapState('app/Example', {
      object: function(state) {
        return state.objects.local[this.$route.params.pk]
      }
    }),
  },
})
</script>
