<script setup>
import { ref } from 'vue'

const demoModel = ref('')
</script>

<template>
    <section>
        FROM RECEIVE

        <q-input label="Demo value receive" v-model="demoModel" fileld/>
    </section>
</template>
