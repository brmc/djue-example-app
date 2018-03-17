<template>
  <div>
    <form action="." method="post">
      <div v-if="!object">...Loading</div>
      <div v-else="">
        <p>
          <input required
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
        <p>
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
        fieldNames: state => Object.keys(state.fieldNames),
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
    created () {
      if (!this.object) {
        return
      }
    },
    methods: {
      ...mapActions('app/Example', [
        'update',
        'retrieve',
        'revert',
        'validateField',
      ]),
      save (e) {
        const payload = {}
        let isValid = true

        this.fieldNames.forEach(fieldName => {
          const field = this.object[fieldName]
          if (field.errors.length > 0) {
            isValid = false
          }
          payload[fieldName] = field.value
        })

        if (!isValid) {
          return
        }

        this.update({url: this.routeDescription, payload: payload})
      },
      undo () {
        this.revert(this.object.id.value)
      },
      validate (e) {
        const payload = {
          field: e.target.name,
          id: this.object.id.value,
          value: e.target.value,
          error: e.target.validationMessage,
        }
        this.validateField({payload})
      },
    },
  }
</script>

<style>
  input:invalid {
    border: solid 1px red
  }
</style>