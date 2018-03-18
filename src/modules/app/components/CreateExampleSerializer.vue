<template>
  <div>
    <div v-if="success">
      <div>{{ successMessage }}</div>
      <a href="#"
         @click.stop.prevent="createAnother">
        Create another?
      </a>
    </div>
    <example-form v-else
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
  import ExampleForm from './ExampleForm'

  export default Vue.extend({
    components: {ExampleForm},
    data () {
      return {
        success: false,
        successMessage: 'Example created successfully!',
      }
    },
    computed: {
      ...mapState('app/Example', {
        object: state => state.objects.new,
      }),
      routeDescription () {
        return {
          name: 'example-list',
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
        'create',
        'resetNew',
      ]),
      createAnother () {
        this.success = false
      },
      handleSuccess() {
        this.success = true
        this.resetNew()
      }
    },
  })

</script>

<style>
  input:invalid {
    border: solid 1px red
  }
</style>