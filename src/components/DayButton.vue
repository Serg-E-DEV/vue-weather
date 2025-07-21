<script setup>
import { sprite } from '@/modules/sprite.js';
import { computed } from 'vue';
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

const isActive = computed(() => String(props.active));

const iconElement = sprite.svg('main', props.dayData.icon, 56, 56);
</script>

<template>
  <button type="button" class="reset-button day-button" :data-active="isActive">
    <span v-html="iconElement"></span>
    <span>{{ props.dayData.weekdayShort }}</span>
    <span class="day-button__temperature">{{ props.dayData.temperature }}</span>
  </button>
</template>

<style scoped></style>
