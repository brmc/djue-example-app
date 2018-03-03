<template>
  <div>
    <div v-if="created">
      <div>{{ successMessage }}</div>
      <a href="#" @click="createAnother">Create another?</a>
    </div>
    <form v-else action="." method="post">
      <div>
        <p>
          <!--<label for="id_name">Name:</label>-->
          <input placeholder="Name" type="text" name="name"
                 v-model="object.name.value" maxlength="50"
                 required id="id_name"/>
        <div v-if="object.name.errors">
          <div v-for="error in object.name.errors">
            {{ error }}
          </div>
        </div>
        </p>
        <p><!--<label for="id_description">Description:</label>-->
          <textarea placeholder="Description" name="description" cols="40"
                    rows="10" required
                    id="id_description"
                    v-model="object.description.value"></textarea>
        <div v-if="object.description.errors">
          <div v-for="error in object.description.errors">

            {{ error }}

          </div>
        </div>
        </p>

        <input type='button' @click="save" value="Save"/>
        <input type='button' @click="revert" value="Revert"/>
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
        fields: 'fields',
        object: state => state.objects.new,
      }),
    },
    methods: {
      ...mapActions('app/Example', [
        'create',
        'resetNew',
      ]),
      createAnother () {
        this.resetNew()
        this.created = false
      }
      ,
      save () {
        const payload = {}
        for (const [name, _] of Object.entries(this.fields)) {
          payload[name] = this.object[name].value
        }

        this.create({url: this.$route.path, payload: payload})
            .then(response => {
              if (response.status === 201) {
                this.created = true
              }
            })
      },

      remove () {
        this.$store.commit('MODEL_EXAMPLE_DELETE')
      },

      revert () {
        this.$store.dispatch('MODEL_EXAMPLE_REVERT')
      },
    },
  }

</script>

<style>

</style>