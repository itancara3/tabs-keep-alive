<script setup>
import { onDeactivated, onMounted, onUnmounted, ref } from 'vue'

const pageName = ref('DEMO PAGE 1 152')
const demoModel = ref()

onMounted(async () => {

})

onDeactivated(() => {
  console.log('EXEC ON DEACTIVATED')
})

onUnmounted(() => {
  console.log('EXEC ON UNMOUNTED')
})

</script>

<template>
  <q-page>
    <p>{{ pageName }}</p> dnwqln

    <div class="row q-col-gutter-md">
      <div class="col-xs-12">
        <q-input filled label="Demo text 1" v-model="demoModel" />
      </div>
    </div>
  </q-page>
</template>
