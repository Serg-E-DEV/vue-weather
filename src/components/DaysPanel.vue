<script setup>
import DayStat from '@/components/DayStat.vue';
import DayButton from '@/components/DayButton.vue';
import CityChanger from '@/components/CityChanger.vue';
import { inject } from 'vue';
import { CURRENT_DAY_NUMBER } from '@/modules/symbols.js';

const props = defineProps({
  statItems: { type: Object, default: () => {} },
  forecastDays: { type: Array, default: () => [] },
});

const currentDayNumber = inject(CURRENT_DAY_NUMBER);
</script>

<template>
  <div class="days-panel weather-section__days-panel">
    <ul class="days-panel__stats">
      <li
        v-for="(value, key) in props.statItems"
        :key="key"
        class="days-panel__stats-item"
      >
        <DayStat v-bind="value" />
      </li>
    </ul>
    <div class="days-panel__day-buttons">
      <DayButton
        v-for="(dayData, index) in props.forecastDays"
        :key="dayData.date"
        :data-date="dayData.date"
        :data-number="index"
        class="days-panel__day-button"
        :active="currentDayNumber === index"
        :day-data="dayData"
        @click="currentDayNumber = index"
      >
      </DayButton>
    </div>

    <CityChanger />
  </div>
</template>

<style scoped></style>
