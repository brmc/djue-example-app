<template>
  <div>
    <form action="." method="post">
      <div v-if="!object">...Loading</div>
      <div v-else="">
        <p>
          <input required
                 v-model="object.name.value"
                 placeholder="Name"
                 type="text"
                 name="name"
                 maxlength="50"
                 id="id_name"/>
        <div v-if="object.name.errors">
          <div v-for="error in object.name.errors">
            {{ error }}
          </div>
        </div>
        </p>
        <p><!--<label for="id_description">Description:</label>-->
          <textarea required
                    placeholder="Description"
                    name="description"
                    cols="40"
                    rows="10"
                    id="id_description"
                    v-model="object.description.value"></textarea>
        <div v-if="object.description.errors">
          <div v-for="error in object.description.errors">
            {{ error }}
          </div>
        </div>
        </p>

        <input type='button' @click="save" value="Save"/>
        <input type='button' @click="undo" value="Undo"/>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
        confirmDelete: false,
      }
    },
    computed: {
      ...mapState('app/Example', {
        'fields': 'fields',
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
    created () {
      if (!this.object) {
        return
      }

      this.retrieve(this.routeDescription)
    },
    methods: {
      ...mapActions('app/Example', [
        'update',
        'retrieve',
        'revert',
      ]),
      save () {
        const payload = {}
        for (const [name, _] of Object.entries(this.fields)) {
          payload[name] = this.object[name].value
        }

        this.update({url: this.routeDescription, payload: payload})
      },
      undo () {
        this.revert(this.object.id.value)
      },
    },
  }
</script>

<style>
</style>