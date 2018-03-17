<template>
  <div>
    <div v-if="created">
      <div>{{ successMessage }}</div>
      <a href="#" @click.stop.prevent="createAnother">Create another?</a>
    </div>
    <form v-else action="." method="post">
      <div>
        <p>
          <input required
                 :value="object.name.value"
                 @keyup="validate"
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
        <p>
          <textarea required
                    placeholder="Description"
                    name="description"
                    cols="40"
                    rows="10"
                    @keyup="validate"
                    id="id_description"
                    :value="object.description.value"></textarea>
        <div v-if="object.description.errors">
          <div v-for="error in object.description.errors">

            {{ error }}

          </div>
        </div>
        </p>

        <input type='button' @click.prevent.stop="save" value="Save"/>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
        created: false,
        successMessage: 'Object created successfully!',
      }
    },
    computed: {
      ...mapState('app/Example', {
        fieldNames: state => Object.keys(state.fields),
        object: state => state.objects.new,
      }),
      routeDescription () {
        return {
          name: 'example-list',
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
        'create',
        'resetNew',
        'validateField',
      ]),
      createAnother () {
        this.created = false
      }
      ,
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

        this.create({url: this.$route.path, payload: payload})
            .then(response => {
              if (response.status === 201) {
                this.created = true
                this.resetNew()
              }
            })
      },
      validate (e) {
        const payload = {
          object: this.object,
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