<script setup>
import { ref, computed } from 'vue';
import * as weatherApi from '@/modules/wheather-api.js';
import { firstCharToUpper } from '@/modules/utils.js';

import DayStat from '@/components/DayStat.vue';
import DayButton from '@/components/DayButton.vue';
import CityChanger from '@/components/CityChanger.vue';
import DayDetail from '@/components/DayDetail.vue';

// const LOCAL = 'ru-RU';
const LOCAL = 'en-EN';

const currentDayNumber = ref(-1);

let forecastData = ref({});

const forecastDays = computed(() => {
  const city = forecastData.value.location?.name;
  const country = forecastData.value.location?.country;
  const dayItems = forecastData.value.forecast?.forecastday || [];

  return dayItems.map((dayItem) => {
    if (dayItem) {
      const dateInfo = getDateInfo(dayItem.date);
      return {
        ...dateInfo,
        code: dayItem.day.condition.code,
        temperature: Math.round(dayItem.day.maxtemp_c) + '°C',
        humidity: dayItem.day.avghumidity + ' %',
        windSpeed: Math.round(dayItem.day.maxwind_kph) + ' м/с',
        rainChance: dayItem.day.daily_chance_of_rain,
        snowChance: dayItem.day.daily_chance_of_snow,
        precipitationChance:
          Math.max(
            dayItem.day.daily_chance_of_rain,
            dayItem.day.daily_chance_of_snow
          ) + ' %',
        visibility: dayItem.day.avgvis_km + ' km',
        description: dayItem.day.condition.text,
        icon: weatherApi.getIconId(dayItem.day.condition.code),
        city,
        country,
      };
    }
  });
});

const currentForecastDay = computed(() => {
  const dayNumber = currentDayNumber.value;
  return forecastDays.value[dayNumber];
});

const statItems = computed(() => {
  const dayNumber = currentDayNumber.value;

  return {
    humidity: {
      title: 'Humidity',
      value: `${forecastDays.value[dayNumber]?.humidity || '-'}`,
    },
    rainChance: {
      title: 'Precipitation',
      value: `${forecastDays.value[dayNumber]?.precipitationChance || '-'}`,
    },
    snowChance: {
      title: 'Visibility',
      value: `${forecastDays.value[dayNumber]?.visibility || '-'}`,
    },
    windSpeed: {
      title: 'Wind',
      value: `${forecastDays.value[dayNumber]?.windSpeed || '-'}`,
    },
  };
});

function getDateInfo(dateString) {
  const date = new Date(dateString);

  const weekdayLong = new Intl.DateTimeFormat(LOCAL, {
    weekday: 'long',
  }).format(date);
  const weekdayShort = new Intl.DateTimeFormat(LOCAL, {
    weekday: 'short',
  }).format(date);
  const dateFormatted = new Intl.DateTimeFormat(LOCAL, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return {
    date: dateString,
    weekdayLong: firstCharToUpper(weekdayLong),
    weekdayShort: firstCharToUpper(weekdayShort),
    dateFormatted: dateFormatted,
  };
}

async function changeCity(cityName) {
  const result = await weatherApi.getCity(cityName);
  // const result = await weatherApi.getCityFake(cityName);

  if (result.success) {
    forecastData.value = result.data;
    currentDayNumber.value = 0;
  } else {
    forecastData.value = {};
    console.error(result.error);
  }
}
</script>

<template>
  <main class="weather-section">
    <DayDetail
      :key_="currentDayNumber"
      :current-day-data="currentForecastDay"
    />
    <div class="days-panel weather-section__days-panel">
      <ul class="days-panel__stats">
        <li
          v-for="(value, key) in statItems"
          :key="key"
          class="days-panel__stats-item"
        >
          <DayStat v-bind="value" />
        </li>
      </ul>
      <div class="days-panel__day-buttons">
        <DayButton
          v-for="(dayData, index) in forecastDays"
          :key="dayData.date + '/' + currentDayNumber"
          :data-date="dayData.date"
          :data-number="index"
          class="days-panel__day-button"
          :active="currentDayNumber === index"
          :day-data="dayData"
          @click="currentDayNumber = index"
        >
        </DayButton>
      </div>

      <CityChanger @change-city="changeCity" />
    </div>
  </main>
</template>

<style scoped></style>
