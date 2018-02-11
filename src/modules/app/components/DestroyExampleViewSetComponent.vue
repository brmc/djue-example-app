<template>
<div>
  
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {

  data() {
    return {
      loading: true,
      // todo: include relevant data
    }
  },
  computed: {
    ...mapState('app/Example', {
      objects: state => state.objects
    })
  },
  created() {
    //this.destroy()
  },
  watch: {
    //'$route': 'destroy',
  },
  methods: {
    ...mapActions('app/Example', [
      'destroy'
    ])
  },
}

</script>

<style>

</style>