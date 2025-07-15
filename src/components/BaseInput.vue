<script setup>
const model = defineModel({ type: String, required: true, default: 'null' });
</script>

<template>
  <input v-model="model" class="base-input" />
</template>

<style scoped></style>
