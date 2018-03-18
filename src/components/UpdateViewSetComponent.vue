<template>
  <div>
    <div v-if="success">{{successMessage}}</div>
    <instance-form :object="object"
                  :method="update"
                  :action='routeDescription'
                  @reset="undo"
                  @success="handleSuccess"/>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import stateModule from './StateModule'

  export default {
    data () {
      return {
        success: false,
        successMessage: 'This Example was saved',
      }
    },
    computed: {
        ...mapState({
          stateModule,
          object(state) {
            return this.stateModule.objects.all[this.$route.params.pk]
          }
      }),
      routeDescription () {
        return {
          name: this.routeName,
          params: {
            pk: this.object.id.value,
          },
        }
      },
    },
    created () {
      if (!this.object) {
        return
      }
    },
    methods: {
        ...mapActions({
          update(dispatch, url, payload) {
            dispatch(`${this.namespace}/update`, {url, payload})
          },
          revert(dispatch, id) {
            dispatch(`${this.namespace}/revert`, id)
          }
        }),
      handleSuccess () {
        this.success = true
      },
      undo () {
        this.revert(this.object.id.value)
      },
    },

  }
</script>

<style>
  input:invalid {
    border: solid 1px red
  }
</style>