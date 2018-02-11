<template>
<div>
  <button v-if="active !== 0" @click='activate(0)'>List</button>
  <button v-if="active !== 1" @click='activate(1)'>Create</button>
  <list-example-view-set-component v-if="active==0"></list-example-view-set-component>
  <create-example-serializer v-if="active==1"></create-example-serializer>
</div>
</template>

<script>
import ListExampleViewSetComponent from '.././components/ListExampleViewSetComponent.vue'
import CreateExampleSerializer from '.././components/CreateExampleSerializer'

export default {
  data() {
    return {
      active: 0
    }
  },
  components: {
    CreateExampleSerializer,
    ListExampleViewSetComponent,
  },
  methods: {
    activate(i) {
      this.active = i
    }
  }
}

</script>

<style>
</style>