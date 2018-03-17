<template>
  <div>
    <ul>
      <li v-for="object in objects.all">
        <router-link
            :class="getClasses(object)"
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
  import { areEqual } from '../util'

  export default {
    data () {
      return {
        loading: true,
        routeName: '',
        detailRouteName: '',
      }
    },
    computed: {
      ...mapState({
        stateModule (state) {
          this.namespace.split('/').forEach(n => state = state[n])
          return state
        },
        objects (state) {
          return this.stateModule.objects
        },
        fieldNames (state) {
          return Object.keys(this.stateModule.fields)
        },
      }),
      routeDescription () {
        return {
          name: this.routeName,
          params: {},
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
      getClasses (object) {
        return {
          invalid: this.hasErrors(object),
          changed: this.hasChanged(object),
        }
      },
      getPath (object) {
        return {name: this.detailRouteName, params: {pk: object.id.value}}
      },
      hasChanged (object) {
        const master = this.objects.master[object.id.value]
        return !areEqual(object, master, this.fieldNames)
      },
      hasErrors (object) {
        for (const field of this.fieldNames) {
          if (object[field].errors.length > 0) {
            return true
          }
        }
        return false
      },
      ...mapActions({
        list (dispatch) {
          return dispatch(`${this.namespace}/list`, this.routeDescription)
        },
      }),
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