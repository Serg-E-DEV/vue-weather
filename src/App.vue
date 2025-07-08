<script setup>
const a = 0;
const b = '<img />';
const color = 'red';
// const id = 'blockTest';
// const isRed = false;
// const message = 'Строка сообщения';
</script>

<template>
    <main>Hello world! {{ a }}, {{ isRed ? 'true' : 'false' }}</main>
    <div v-html="b"></div>
    <div :class="color">Цвет</div>
    <div :class="`color-${color}`">Цвет</div>
    <div class="section">Секция</div>
</template>

<style scoped>
.red {
    background: red;
}
</style>
