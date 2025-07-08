<script setup>
import { sprite } from '@/modules/sprite.js';

const iconSun = sprite.svg('main', 'sun', 32, 32);
</script>

<template>
    <div class="section">
        <span v-html="iconSun"></span>
        Text
    </div>
</template>

<style scoped></style>
