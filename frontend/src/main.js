import { createApp } from 'vue'
import App from './App.vue'
import store from './store' // Vuex Store
import router from './router' // Vuex Router

const app = createApp(App)

app.use(store);
app.use(router);
app.mount('#app');
