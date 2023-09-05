<script setup>
import { ref } from 'vue'

const demoModel = ref('')
</script>

<template>
    <section>
        FROM INVENTORY

        <q-input label="Demo value inventory" v-model="demoModel" filled/>
    </section>
</template>
