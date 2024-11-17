import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faBars, faUserSecret, faMagnifyingGlass, faBagShopping, faUser, faHouse } from '@fortawesome/free-solid-svg-icons';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from '../App.vue';
import { createHead } from '@vueuse/head';
import defaultPicture from '@/assets/image/not_found.webp';
import VueLazyload from 'vue-lazyload';
import { registerSW } from 'virtual:pwa-register'

library.add(faUserSecret, faMagnifyingGlass, faBagShopping, faUser, faHouse, faBars);

const app = createApp(App);
const head = createHead();

app.use(createPinia());
app.use(router);
app.use(head);

app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
});

app.use(VueLazyload, {
    loading: defaultPicture,
    error: defaultPicture,
    attempt: 3,
})

app.component('font-awesome-icon', FontAwesomeIcon);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/ticketing/sw.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// PWA auto-update
const updateSW = registerSW({
    onNeedRefresh() {
      // Prompt user for update
      if (confirm('New content available. Reload?')) {
        updateSW(true)
      }
    },
    onOfflineReady() {
      console.log('App ready to work offline')
    }
  })

app.mount('#app');
