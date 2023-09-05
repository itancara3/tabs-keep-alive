<script setup>
import { onDeactivated, onMounted, onUnmounted, ref } from 'vue'

const pageName = ref('DEMO HIJO 1')

const demoModel = ref()

onMounted(() => {
  console.log('EXEC TAB UNO')
})

onDeactivated(() => {
  console.log('EXEC ON DEACTIVATED')
})

onUnmounted(() => {
  console.log('EXEC ON UNMOUNTED')
})

</script>

<template>
    <section>
        {{ pageName }}

        <q-input filled label="Demo from child 2" v-model="demoModel">

        </q-input>
    </section>
</template>
