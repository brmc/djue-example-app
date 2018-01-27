<template>
<div>
  <retrieve-example-view-set-component></retrieve-example-view-set-component>
<example-serializer></example-serializer>
<destroy-example-view-set-component></destroy-example-view-set-component>
</div>
</template>

<script>
import DestroyExampleViewSetComponent from '.././components/DestroyExampleViewSetComponent.vue'
import ExampleSerializer from '.././components/ExampleSerializer.vue'
import RetrieveExampleViewSetComponent from '.././components/RetrieveExampleViewSetComponent.vue'

export default {
  components: {
    ExampleSerializer,
    RetrieveExampleViewSetComponent,
    DestroyExampleViewSetComponent,
  }
}

</script>

<style>

</style>