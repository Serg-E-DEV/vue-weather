<script setup>
import { sprite } from '@/modules/sprite.js';
import { computed } from 'vue';
const props = defineProps({
  dayImagePath: {
    type: String,
    default: () => '/images/day-detail.jpg',
  },
  currentDayData: {
    type: Object,
    default: () => ({
      weekdayLong: '-',
      dateFormatted: '-',
      temperature: '-',
      description: '-',
      icon: 'default',
      city: '-',
      country: '-',
    }),
  },
});
const dayImagePath = props.dayImagePath;
const geoIcon = sprite.svg('main', 'geo', 28, 28);
const detailIcon = computed(() =>
  sprite.svg('main', props.currentDayData.icon, 96, 96)
);
</script>

<template>
  <div class="day-detail weather-section__day-detail">
    <img
      class="day-detail__img"
      :src="dayImagePath"
      width="492"
      height="664"
      alt=""
      loading="lazy"
    />
    <div class="day-detail__inner">
      <div class="day-detail__header">
        <div class="day-detail__week-day">
          {{ props.currentDayData.weekdayLong }}
        </div>
        <div class="day-detail__date">
          {{ props.currentDayData.dateFormatted }}
        </div>
        <div class="day-detail__location">
          <span v-html="geoIcon"></span>
          {{ props.currentDayData.city }}, {{ props.currentDayData.country }}
        </div>
      </div>

      <div class="day-detail__content">
        <div class="day-detail__temperature">
          <span v-html="detailIcon"></span>
          {{ props.currentDayData.temperature }}
        </div>
        <div class="day-detail__status">
          {{ props.currentDayData.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
