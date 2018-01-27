<template>
<div>
  <form action="." method="post">
  <div v-if="loading">...Loading</div>
  <div v-else="">
    <p><label for="id_name">Name:</label>
 <input type="text" name="name" v-model="name.value" maxlength="50" required id="id_name" />
<div v-if="name.errors">
  <div v-for="error in name.errors">
    
    {{ error }}
    
  </div>
</div></p>
<p><label for="id_description">Description:</label>
 <textarea name="description" cols="40" rows="10" required id="id_description"
          v-model="description">
</textarea>
<div v-if="description.errors">
  <div v-for="error in description.errors">
    
    {{ error }}
    
  </div>
</div></p>

    <input type='button' @click="save" value="Save"/>
    <input v-if="id" type='button' @click="remove" value="Delete"/>
    <input type='button' @click="revert" value="Revert"/>
  </div>
</form>
</div>
</template>

<script>
import mapGetters from 'vuex'

export default {
  data() {
    return {
      loading: true,
      name: null,
      description: null,
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
  },
  methods: {
    fetchData() {
      this.loading = true
      let object = this.$store.state.app.Example.objects.all[this.$route.params.id] ||
        this.$store.state.app.Example.objects.new

      Object.assign(this, object)
      this.object = object
      this.loading = false
    },
    save() {
      let object = this.id === this.$route.params.id ? this.object : {}
      Object.assign(this, object)

      this.$store.dispatch('app/save', { object })
    },

    remove() {
      this.$store.commit('MODEL_EXAMPLE_DELETE')
    },

    revert() {
      this.$store.dispatch('MODEL_EXAMPLE_REVERT')
    }
  },
}

</script>

<style>

</style>