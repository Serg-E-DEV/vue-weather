<script setup>
import { ref, computed, provide, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import * as weatherApi from '@/modules/wheather-api.js';
import { firstCharToUpper, getShortLocaleCode } from '@/modules/utils.js';

import DayDetail from '@/components/DayDetail.vue';
import DaysPanel from '@/components/DaysPanel.vue';

import { CITY_NAME, CURRENT_LOCALE } from '@/modules/symbols.js';
import { CURRENT_DAY_NUMBER } from '@/modules/symbols.js';
import { LOCALE_CODES } from '@/modules/constants.js';
import LangSwitcher from '@/components/LangSwitcher.vue';

const { locale, t } = useI18n();
locale.value = LOCALE_CODES.ru;
provide(CURRENT_LOCALE, locale);

const cityName = ref('');
provide(CITY_NAME, cityName);

const currentDayNumber = ref(0);
provide(CURRENT_DAY_NUMBER, currentDayNumber);

let forecastData = ref({});

const forecastDays = computed(() => {
  const city = forecastData.value.location?.name;
  const country = forecastData.value.location?.country;
  const dayItems = forecastData.value.forecast?.forecastday || [];
  const localeCode = locale.value;

  return dayItems.map((dayItem) => {
    if (dayItem) {
      const dateInfo = getDateInfo(dayItem.date, localeCode);
      return {
        ...dateInfo,
        code: dayItem.day.condition.code,
        temperature: `${Math.round(dayItem.day.maxtemp_c)} ${t('units.temperature')}`,
        humidity: `${dayItem.day.avghumidity} ${t('units.percent')}`,
        windSpeed: `${Math.round(dayItem.day.maxwind_kph / 3.6)} ${t('units.speed')}`,
        rainChance: dayItem.day.daily_chance_of_rain,
        snowChance: dayItem.day.daily_chance_of_snow,
        precipitationChance: `${Math.max(
          dayItem.day.daily_chance_of_rain,
          dayItem.day.daily_chance_of_snow
        )} ${t('units.percent')}`,
        visibility: `${dayItem.day.avgvis_km} ${t('units.distance')}`,
        description: t(`weatherDescriptions.${dayItem.day.condition.code}`),
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
      title: t('stats.humidity'),
      value: `${forecastDays.value[dayNumber]?.humidity || '-'}`,
    },
    rainChance: {
      title: t('stats.precipitation'),
      value: `${forecastDays.value[dayNumber]?.precipitationChance || '-'}`,
    },
    snowChance: {
      title: t('stats.visibility'),
      value: `${forecastDays.value[dayNumber]?.visibility || '-'}`,
    },
    windSpeed: {
      title: t('stats.wind'),
      value: `${forecastDays.value[dayNumber]?.windSpeed || '-'}`,
    },
  };
});

function getDateInfo(dateString, localeCode) {
  const date = new Date(dateString);

  const weekdayLong = new Intl.DateTimeFormat(localeCode, {
    weekday: 'long',
  }).format(date);
  const weekdayShort = new Intl.DateTimeFormat(localeCode, {
    weekday: 'short',
  }).format(date);
  const dateFormatted = new Intl.DateTimeFormat(localeCode, {
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
  const result = await weatherApi.getCity(
    cityName,
    getShortLocaleCode(locale.value)
  );
  // const result = await weatherApi.getCityFake(
  //   cityName,
  //   getShortLocaleCode(locale.value)
  // ); // TODO: use for test, delete later

  if (result.success) {
    forecastData.value = result.data;
    currentDayNumber.value = 0;
  } else {
    forecastData.value = {};
    console.error(result.error);
  }
}

onMounted(() => {
  changeCity(t('cityNameDefault'), getShortLocaleCode(LOCALE_CODES.en));
});

watch(cityName, (newValue) => {
  changeCity(newValue, getShortLocaleCode(LOCALE_CODES.en));
});
</script>

<template>
  <main class="weather-section">
    <LangSwitcher />
    <DayDetail :key="currentDayNumber" :current-day-data="currentForecastDay" />
    <DaysPanel
      :current-day-number="currentDayNumber"
      :stat-items="statItems"
      :forecast-days="forecastDays"
      @change-city="changeCity"
    />
  </main>
</template>

<style scoped></style>
