<template>
  <div>
    <div v-if="errors" v-for="error in errors">
      {{error}}
    </div>
    <div >
      <retrieve-example-view-set-component v-if="!edit" />
      <update-example-serializer v-else />
      <a href="#" v-if="edit"  @click.prevent.stop="edit = false">Cancel</a>
      <a href="#" v-else @click.prevent.stop="edit = true">Edit</a>

      <destroy-example-view-set-component/>

    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import DestroyExampleViewSetComponent from '.././components/DestroyExampleViewSetComponent.vue'
  import UpdateExampleSerializer from '.././components/UpdateExampleSerializer.vue'
  import RetrieveExampleViewSetComponent from '.././components/RetrieveExampleViewSetComponent.vue'

  export default {
    data () {
      return {
        edit: false,
      }
    },
    computed: {
      ...mapState('app/Example', {
        object: function (state) {
          return state.objects.all[this.$route.params.pk]
        },
        errors: state => state.errors
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
    watch: {
      '$route' (to, from) {
        this.retrieve(to)
      },
    },
    created () {
      this.retrieve(this.$route)
    },
    methods: {
      ...mapActions('app/Example', [
        'retrieve',
      ]),
    },
    components: {
      UpdateExampleSerializer,
      RetrieveExampleViewSetComponent,
      DestroyExampleViewSetComponent,
    },
  }

</script>

<style>
</style>