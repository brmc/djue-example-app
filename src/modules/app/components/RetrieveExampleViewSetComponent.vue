<template>
  <div>
    <div v-if="!object">...loading</div>
    <div v-else v-for="field in fieldNames">{{ field }}: {{
      object[field].value }}
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState('app/Example', {
        object: function (state) {
          return state.objects.all[this.$route.params.pk]
        },
        fieldNames: state => Object.keys(state.fields),
      }),
    },
    methods: {
      ...mapActions('app/Example', [
        'retrieve',
        'removeActiveObject',
      ]),
    },
  }

</script>

<style>

</style>