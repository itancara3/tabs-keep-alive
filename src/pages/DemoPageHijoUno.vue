<script setup>
import { useCoreStore } from 'src/stores/example-store'
import { onDeactivated, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const pageName = ref('DEMO HIJO 1')
const store = useCoreStore()
const Route = useRoute()
const demoModel = ref()

onMounted(() => {
  pageName.value = `FROM ${Route.name}`
  demoModel.value = Route.fullPath
})

onDeactivated(() => {

})

onUnmounted(() => {

})

const addTab = () => {
  store.addTab({ parentName: Route.name })
}

</script>

<template>
    <section class="row q-col-gutter-md">
        <div class="col-xs-12">
          {{ pageName }}
        </div>

        <div class="col-xs-12">
          <q-input filled label="Field from CHILD" v-model="demoModel"></q-input>
        </div>

        <div class="col-xs-12">
          <p>FROM DINAMIC PAGE</p>
        </div>

        <div class="col-xs-12">
          <q-btn label="Add new tab" @click="addTab" color="secondary"/>
        </div>

    </section>
</template>
