<script setup>
const { theme } = defineProps({
  theme: {
    type: String,
    default: '',
  },
});
const themeModificator = theme && `base-button_theme_${theme}`;
</script>

<template>
  <button type="button" :class="['base-button', themeModificator]">
    <span class="base-button__inner">
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
