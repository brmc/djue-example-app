<template>
  <div>
    <div v-if="confirmDelete">
      <p> Are you sure you would like to delete this object?</p>
      <a href="#" @click="remove">Yes</a>
      <a href="#" @click="confirmDelete=false">No</a>
    </div>
    <div v-else>
      <input type='button' @click="confirmDelete=true"
             value="Delete"/>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        confirmDelete: false,
      }
    },
    watch: {
      $route () {
        this.confirmDelete = false
      },
    },
    computed: {
      ...mapState('app/Example', {
        object: state => state.objects.active,
      }),
      routeDescription () {
        return {
          name: 'example-detail',
          params: {
            pk: this.object.id.value,
          },
        }
      },
    },
    methods: {
      ...mapActions('app/Example', [
        'destroy',
      ]),
      remove () {
        this.destroy(this.routeDescription)
      },
    },
  }

</script>

<style>
</style>