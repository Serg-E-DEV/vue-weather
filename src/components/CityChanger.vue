<script setup>
import { inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { sprite } from '@/modules/sprite.js';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';

import { CITY_NAME } from '@/modules/symbols.js';

const { t } = useI18n();
const icon = sprite.svg('main', 'geo', 28, 28);

const isEditing = ref(false);
const cityName = inject(CITY_NAME);
const inputValue = ref(cityName.value);

function saveCity() {
  cityName.value = inputValue.value;
  isEditing.value = false;
}
</script>

<template>
  <div class="city-changer">
    <BaseButton
      v-if="!isEditing"
      theme="primary"
      class="city-changer__button"
      @click="isEditing = true"
    >
      <span v-html="icon"></span>
      {{ t('changeCity') }}
    </BaseButton>

    <template v-else>
      <BaseInput
        v-model="inputValue"
        v-focus
        type="search"
        name="city-name"
        :placeholder="t('enterCity')"
        class="city-changer__input"
        @keyup.enter="saveCity"
        @keyup.esc="isEditing = false"
      />

      <BaseButton
        theme="primary"
        class="city-changer__button"
        @click="saveCity()"
      >
        {{ t('save') }}
      </BaseButton>
    </template>
  </div>
</template>

<style scoped></style>
