<template>
  <div>
    <div v-if="success">
      <div>{{ successMessage }}</div>
      <a href="#"
         @click.stop.prevent="createAnother">
        Create another?
      </a>
    </div>
    <instance-form v-else
                   :object="object"
                   :method="create"
                   :action='routeDescription'
                   @reset="resetNew"
                   @success="handleSuccess"/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapActions, mapState } from 'vuex'
  import stateModule from './StateModule'

  export default Vue.extend({
    data () {
      return {
        objectName: 'Object',
        success: false,
      }
    },
    computed: {
      successMessage () {
        return `${this.objectName} created successfully!`
      },
      ...mapState({
        stateModule,
        object (state) {
          return this.stateModule.objects.new
        },
      }),
      routeDescription () {
        return {
          name: this.routeName,
        }
      },
    },
    created () {
      if (!this.object) {}
    },
    methods: {
      ...mapActions({
        create (dispatch, {url, payload}) {
          return dispatch(`${this.namespace}/create`, {url, payload})
        },
        resetNew (dispatch) {
          return dispatch(`${this.namespace}/resetNew`)
        },
      }),
      createAnother () {
        this.success = false
      },
      handleSuccess () {
        this.success = true
        this.resetNew()
      },
    },
  })

</script>

<style>
  input:invalid {
    border: solid 1px red
  }
</style>