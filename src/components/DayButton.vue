<script setup>
import { sprite } from '@/modules/sprite.js';
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  dayData: {
    type: Object,
    default: () => ({
      icon: 'default',
      temperature: '-',
      weekdayShort: '-',
    }),
  },
});

const { icon, weekdayShort, temperature } = props.dayData;
const isActive = props.active;

const iconElement = sprite.svg('main', icon, 56, 56);
</script>

<template>
  <button class="reset-button day-button" :data-active="String(isActive)">
    <span v-html="iconElement"></span>
    <span>{{ weekdayShort }}</span>
    <span class="day-button__temperature">{{ temperature }}</span>
  </button>
</template>

<style scoped></style>
