import './assets/main.css'
// import '@fortawesome/fontawesome-free/css/all.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faBars, faUserSecret, faMagnifyingGlass, faBagShopping, faUser, faHouse } from '@fortawesome/free-solid-svg-icons';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from '../App.vue';
import vue3GoogleLogin from 'vue3-google-login'
import { createHead } from '@vueuse/head';

// Add icons to the library
library.add(faUserSecret, faMagnifyingGlass, faBagShopping, faUser, faHouse, faBars);

const app = createApp(App); // App component should be your root component, typically 'App.vue'
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

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
