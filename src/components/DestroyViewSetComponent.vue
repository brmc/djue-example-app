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
        ...mapState({
          object(state) {
            return state.app.Example.objects.active
          }
        }),
        ...mapGetters({
          objsect(state, getters) {
            console.log(getters)
            return getters['app']['Example'].getActive
          }
        })
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