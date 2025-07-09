<script setup>
import { sprite } from '@/modules/sprite.js';

const geoIcon = sprite.svg('main', 'geo', 28, 28);
const detailSunIcon = sprite.svg('main', 'sun', 96, 96);
const previewSunIcon = sprite.svg('main', 'sun', 56, 56);
</script>

<template>
    <main class="weather-section">
        <div class="day-detail weather-section__day-detail">
            <img
                class="day-detail__img"
                src="/images/day-detail.jpg"
                width="492"
                height="664"
                alt=""
                loading="lazy"
            />
            <div class="day-detail__inner">
                <div class="day-detail__header">
                    <div class="day-detail__week-day">Вторник</div>
                    <div class="day-detail__date">20 июня 2025</div>
                    <div class="day-detail__location">
                        <span v-html="geoIcon"></span>
                        Москва
                    </div>
                </div>

                <div class="day-detail__content">
                    <div class="day-detail__temperature">
                        <span v-html="detailSunIcon"></span>
                        29 °C
                    </div>
                    <div class="day-detail__status">Солнечно</div>
                </div>
            </div>
        </div>

        <div class="days-panel weather-section__days-panel">
            <ul class="days-panel__info">
                <li class="days-panel__info-item">
                    <span class="days-panel__info-title">ВЛАЖНОСТЬ</span>
                    <span>90%</span>
                </li>
                <li class="days-panel__info-item">
                    <span class="days-panel__info-title">ОСАДКИ</span>
                    <span>0%</span>
                </li>
                <li class="days-panel__info-item">
                    <span class="days-panel__info-title">ВЕТЕР</span>
                    <span>3 м/ч</span>
                </li>
            </ul>
            <div class="days-panel__day-buttons">
                <button
                    class="reset-button day-button days-panel__day-button"
                    data-active
                >
                    <span v-html="previewSunIcon"></span>
                    <span>Вт</span>
                    <span class="day-button__temperature">30 °C</span>
                </button>
                <button class="reset-button day-button days-panel__day-button">
                    <span v-html="previewSunIcon"></span>
                    <span>Вт</span>
                    <span class="day-button__temperature">30 °C</span>
                </button>
                <button class="reset-button day-button days-panel__day-button">
                    <span v-html="previewSunIcon"></span>
                    <span>Вт</span>
                    <span class="day-button__temperature">30 °C</span>
                </button>
                <button class="reset-button day-button days-panel__day-button">
                    <span v-html="previewSunIcon"></span>
                    <span>Вт</span>
                    <span class="day-button__temperature">30 °C</span>
                </button>
            </div>
            <button class="base-button base-button_type_primary">
                <span class="base-button__inner">
                    <span v-html="geoIcon"></span>
                    Изменить город
                </span>
            </button>
        </div>
    </main>
</template>

<style scoped></style>
