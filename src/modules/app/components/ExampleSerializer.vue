<template>
  <form @submit.prevent="save" action="." method="post">
  <div> <input type="text"
       name="name"
       @keyup="validate"
       placeholder="Name"
       :value="object.name.value" maxlength="50" required id="id_name" />
<div v-if="object.name.errors">
  <div v-for="error in object.name.errors">
    {{ error }}
  </div>
</div></div>
<div> <textarea name="description" cols="40" rows="10" required id="id_description"
          placeholder="Description"
          @keyup="validate"
          :value="object.description.value">
</textarea>
<div v-if="object.description.errors">
  <div v-for="error in object.description.errors">
    {{ error }}
  </div>
</div></div>

  <input type='submit' value="Save"/>
  <input type='button' @click.prevent.stop="$emit('reset')" value="reset"/>
</form>
</template>

<script>
import Vue from 'vue'
import Serializer from '../../../components/Serializer'

export default Vue.extend({
  mixins: [Serializer],

  data() {
    return {
      namespace: 'app/Example'
    }
  },
})
</script>
