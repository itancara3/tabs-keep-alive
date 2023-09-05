<script setup>
import { onMounted, ref } from 'vue'

const pageName = ref('DEMO PAGE 4')

onMounted(() => {
  console.log('FROM PAGE FOUR')
})

</script>

<template>
    <section>
        {{ pageName }}
    </section>
</template>
