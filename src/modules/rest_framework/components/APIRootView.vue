<template>
  <div>
    <ul>
      <li v-if="error">{{ error }}</li>
      <li v-if="!urls">...loading</li>
      <li v-else="" v-for="(url, name) in urls">
        <router-link :to="url">{{ name }}</router-link>
      </li>
    </ul>
    <div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: mapState([
      'urls',
      'error'
    ]),
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        if (this.urls.length > 0) {
          return
        }

        this.$store.dispatch('loadRoot')
      },
    },
  }
</script>

<style>
</style>