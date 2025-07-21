import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

import '@/scss/app.scss';
import App from '@/App.vue';

import { DEFAULT_LOCALE_CODE, LOCALE_CODES } from '@/modules/constants.js';
import ruMessages from '@/locales/ru.js';
import enMessages from '@/locales/en.js';

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE_CODE,
  fallbackLocale: DEFAULT_LOCALE_CODE,
  messages: {
    [LOCALE_CODES.ru]: ruMessages,
    [LOCALE_CODES.en]: enMessages,
  },
});

createApp(App);
const app = createApp(App);

app.use(i18n);
app.directive('focus', (el) => {
  el.focus();
});
app.mount('#app');
