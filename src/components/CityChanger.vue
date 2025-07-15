<script setup>
import { onMounted, ref } from 'vue';
import { sprite } from '@/modules/sprite.js';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';

const icon = sprite.svg('main', 'geo', 28, 28);

const emit = defineEmits({
  changeCity: null,
});

const isEditing = ref(false);
const cityName = ref('London');

function changeCity() {
  emit('changeCity', cityName.value);
  isEditing.value = false;
}

onMounted(() => {
  emit('changeCity', cityName.value);
});
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
      Change city
    </BaseButton>

    <template v-else>
      <BaseInput
        v-model="cityName"
        type="text"
        name="city-name"
        placeholder="Введите город"
        class="city-changer__input"
        @keyup.enter="changeCity()"
        @keyup.esc="isEditing = false"
      />

      <BaseButton
        theme="primary"
        class="city-changer__button"
        @click="changeCity()"
      >
        Save
      </BaseButton>
    </template>
  </div>
</template>

<style scoped></style>
