<template>
  <div>
    <form action="." method="post">
      <div v-if="!object">...Loading</div>
      <div v-else="">
        <p>
          <input required
                 gv-model="object.name.value"
                 :value="object.name.value"
                 @keyup="validate"
                 placeholder="Name"
                 type="text"
                 name="name"
                 pattern="www"
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

        <input type='button' @click.prevent.stop="save" value="Save"/>
        <input type='button' @click.prevent.stop="undo" value="Undo"/>
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
    /*created () {
      /!*if (!this.object) {
        return
      }
*!/
      this.retrieve(this.routeDescription)
    },*/
    methods: {
      ...mapActions('app/Example', [
        'update',
        'retrieve',
        'revert',
        'pushHtmlError',
        'validateField',
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
      validate (e) {
        const field = e.target.name
        const id = this.object.id.value
        if (e.target.checkValidity()) {
          //return this.validateField({field, id,})
        }

        this.pushHtmlError({
          field: field,
          id: id,
          error: e.target.validationMessage,
        })

      },
    },
  }
</script>

<style>
  input:invalid {
    border: solid 1px red
  }
</style>