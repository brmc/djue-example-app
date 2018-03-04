<template>
  <div>
    <div v-if="confirmDelete">
      <p> Are you sure you would like to delete this object?</p>
      <a href="#" @click="destroy">Yes</a>
      <a href="#" @click="confirmDelete=false">No</a>
    </div>
    <div v-else>
      <input type='button' @click="confirmDelete=true"
             value="Delete"/>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        confirmDelete: false,
      }
    },
    computed: {
      routeDescription () {
        return {
          name: this.routeName,
          params: {
            pk: this.object.id.value,
          },
        }
      },
    },
    watch: {
      $route () {
        this.confirmDelete = false
      },
    },
    methods: {
      ...mapActions({
        destroy (dispatch) {
          return dispatch(`${this.namespace}/destroy`, this.routeDescription)
        },
      }),
    },
  }
</script>

<style>
</style>