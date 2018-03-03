<template>
<div>
  <ul>
    <li v-for="object in objects.all">
      <router-link v-bind:to="getPath(object)">{{ object.name.value }}</router-link>
    </li>
  </ul>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'

export default {

  data() {
    return {

      loading: true,

      // todo: include relevant data
    }
  },
  computed: {
    ...mapState('app/Example', {
      objects: state => state.objects
    }),
    routeDescription() {
      return {
        name: 'example-list',
      }
    }
  },
  created() {
    console.log("Suck dick")
    let a = Vue

    this.list(this.routeDescription)
  },
  watch: {
    //'$route': 'list',
  },
  methods: {
    getPath(object) {
      return {name: 'example-detail', params: {pk: object.id.value}}
    },
    ...mapActions('app/Example', [
      'list'
    ])
  },
}

</script>

<style>

</style>