<script setup>
import { sprite } from '@/modules/sprite.js';
import { computed, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import ResetButton from '@/components/ResetButton.vue';
import { CURRENT_LOCALE } from '@/modules/symbols.js';
import { LOCALE_CODES } from '@/modules/constants.js';

const iconEn = sprite.svg('lang', 'en', 40, 26);
const iconRu = sprite.svg('lang', 'ru', 40, 26);
const isEnActive = computed(() => locale.value.startsWith('en'));

const isRuActive = computed(() => locale.value.startsWith('ru'));

const { locale } = useI18n();
const currentLocale = inject(CURRENT_LOCALE);
</script>

<template>
  <div class="lang-switcher">
    <ResetButton
      class="lang-switcher__button"
      :data-active="isRuActive"
      @click="currentLocale = LOCALE_CODES.ru"
    >
      <span v-html="iconRu"></span>
    </ResetButton>
    <ResetButton
      class="lang-switcher__button"
      :data-active="isEnActive"
      @click="currentLocale = LOCALE_CODES.en"
    >
      <span v-html="iconEn"></span>
    </ResetButton>
  </div>
</template>

<style scoped></style>
