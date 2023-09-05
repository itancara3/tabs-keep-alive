<script setup>
import { ref } from 'vue'

const pageName = ref('DEMO FROM REF')
</script>
<template>
    <section>
        <p>FROM DEMO PAGE</p>
        <p>{{ pageName }}</p>
    </section>
</template>
