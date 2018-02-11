<template>
  <div>
    <form action="." method="post">
      <div v-if="loading">...Loading</div>
      <div v-else="">
        <p>
          <label for="id_name">Name:</label>
          <input type="text" name="name" v-model="name.value" maxlength="50"
                 required id="id_name"/>
        <div v-if="name.errors">
          <div v-for="error in name.errors">
            {{ error }}
          </div>
        </div>
        </p>
        <p><label for="id_description">Description:</label>
          <textarea name="description" cols="40" rows="10" required
                    id="id_description"
                    v-model="description.value"></textarea>
        <div v-if="description.errors">
          <div v-for="error in description.errors">

            {{ error }}

          </div>
        </div>
        </p>

        <input type='button' @click="back" value="back"/>
        <input type='button' @click="save" value="Save"/>
        <input v-if="id" type='button' @click="remove" value="Delete"/>
        <input type='button' @click="revert" value="Revert"/>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
        loading: true,
        name: null,
        description: null,
      }
    },
    computed: {
      ...mapState('app/Example', {
        'fields': 'fields',
        object: state => state.objects.active
      }),
    },
    created () {
      console.log('obj', this.object)
      if (this.object !== null) {
        return
      }

      this.retrieve(this.$route.path)
          .catch(err => {debugger})
          .then((a, b, c) => {
            this.loading = false
            Object.assign(this, this.object)
          })
    },
    methods: {
      ...mapActions('app/Example', [
        'retrieve',
        'update',
      ]),
      back () {
        this.$router.back()
      },
      save () {
        const payload = {}
        for (const [name, _] of Object.entries(this.fields)) {
          payload[name] = this[name].value
        }

        this.update({url: this.$route.path, payload: payload})
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