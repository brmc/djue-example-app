<template>
  <div>
    <ul>
      <li v-for="object in objects">{{object.id}}</li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {

        loading: true,
        // todo: include relevant data
      }
    },
    computed: {
      ...mapState('app/Example', {
        objects: state => state.objects,
      }),
    },
    created () {
      this.list()
    },
    watch: {
      '$route': 'list',
    },
    methods: {
      ...mapActions('app/Example',
          [
            'list',
            'create',
          ],
      ),
    },
  }

</script>

<style>

</style>