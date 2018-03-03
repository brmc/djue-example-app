<template>
  <div>
    <destroy-example-view-set-component></destroy-example-view-set-component>
    <retrieve-example-view-set-component
        v-if="!edit"></retrieve-example-view-set-component>
    <update-example-serializer v-else></update-example-serializer>
    <a v-if="edit" href="#" @click="edit = false">Cancel</a>
    <a v-else href="#" @click="edit = true">Edit</a>
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
    watch: {
      '$route' (to, from) {
        this.retrieve(to)
      },
    },
    created () {
      this.retrieve(this.$route.path)
    },
    destroyed () {
      this.softCommit(this.object)
    },
    methods: {
      ...mapActions('app/Example', [
        'retrieve',
        'softCommit',
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