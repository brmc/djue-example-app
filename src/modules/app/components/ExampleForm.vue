<template>
  <form action="." method="post">
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
        namespaace: 'app/Example'
      }
    },
  })
</script>