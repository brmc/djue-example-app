<template>
  <div>
    <div v-if="created">
      <div>{{ successMessage }}</div>
      <a href="#" @click="createAnother">Create another?</a>
    </div>
    <form v-else action="." method="post">
      <div>
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
        <p>
          <textarea placeholder="Description"
                    name="description"
                    cols="40"
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
                this.resetNew()
              }
            })
      },
    },
  }

</script>

<style>

</style>