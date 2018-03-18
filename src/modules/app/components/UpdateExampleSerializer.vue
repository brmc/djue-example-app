<template>
  <div>
    <div v-if="success">{{successMessage}} </div>
    <example-form :object="object"
                  :method="update"
                  :action='routeDescription'
                  @reset="undo"
                  @success="handleSuccess"/>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import ExampleForm from './ExampleForm'

  export default {
    components: {ExampleForm},
    data() {
      return {
        success: false,
        successMessage: 'This Example was saved',
      }
    },
    computed: {
      ...mapState('app/Example', {
        object: function (state) {
          return state.objects.all[this.$route.params.pk]
        },
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
    created () {
      if (!this.object) {
        return
      }
    },
    methods: {
      ...mapActions('app/Example', [
        'update',
        'revert',
      ]),
      handleSuccess() {
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