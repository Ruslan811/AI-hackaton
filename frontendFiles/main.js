import { createApp } from 'vue';
import App from './components/App.vue'; // Здесь загружается главный компонент
import router from './router'; // Router импортируется уже после его объявления!
import './main.css'

createApp(App).use(router).mount('#app');
