<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  title: String,
  value: String,
});

const { title, value } = toRefs(props);
</script>

<template>
  <div class="day-stat">
    <span class="day-stat__title">{{ title }}</span>
    <span class="day-stat__value">{{ value }}</span>
  </div>
</template>

<style scoped></style>
