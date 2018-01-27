<template>
<div>
  <list-example-view-set-component></list-example-view-set-component>
<example-serializer></example-serializer>
</div>
</template>

<script>
import ListExampleViewSetComponent from '.././components/ListExampleViewSetComponent.vue'
import ExampleSerializer from '.././components/ExampleSerializer.vue'

export default {
  components: {
    ExampleSerializer,
    ListExampleViewSetComponent,
  }
}

</script>

<style>

</style>