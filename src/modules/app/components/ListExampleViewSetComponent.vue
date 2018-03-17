<template>
  <div>
    <ul>
      <li v-for="object in objects.all">
        <router-link :class="{invalid: hasErrors(object), changed: hasChanged(object)}"
                     v-bind:to="getPath(object)">
          {{ object.name.value }}
          <span v-if="hasChanged(object)">(modified)</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Vue from 'vue'
  import { areEqual } from '../../../util'

  export default {

    data () {
      return {
        loading: true,
      }
    },
    computed: {
      ...mapState('app/Example', {
        objects: state => state.objects,
        fieldNames: state => Object.keys(state.fieldNames),
      }),
      routeDescription () {
        return {
          name: 'example-list',
        }
      },
    },
    created () {
      this.list(this.routeDescription)
    },
    watch: {
      //'$route': 'list',
    },
    methods: {
      getPath (object) {
        return {name: 'example-detail', params: {pk: object.id.value}}
      },
      hasChanged (object) {
        const master = this.objects.master[object.id.value]
        return !areEqual(object, master, this.fieldNames)
      },
      hasErrors (object) {
        for (const field of this.fieldNames) {
          if (object[field].errors.length > 0) {

            console.log(field)
            console.log(object[field].errors)
            return true
          }
        }
        return false
      },
      ...mapActions('app/Example', [
        'list',
      ]),
    },
  }

</script>

<style>
  .invalid {
    color: red;
  }
  .changed {
    font-style: italic;
  }
</style>