<template>
<div>
  <retrieve-example-view-set-component></retrieve-example-view-set-component>
<update-example-serializer></update-example-serializer>
<destroy-example-view-set-component></destroy-example-view-set-component>
</div>
</template>

<script>
import DestroyExampleViewSetComponent from '.././components/DestroyExampleViewSetComponent.vue'
import UpdateExampleSerializer from '.././components/UpdateExampleSerializer.vue'
import RetrieveExampleViewSetComponent from '.././components/RetrieveExampleViewSetComponent.vue'

export default {
  components: {
    UpdateExampleSerializer,
    RetrieveExampleViewSetComponent,
    DestroyExampleViewSetComponent,
  }
}

</script>

<style>
</style>