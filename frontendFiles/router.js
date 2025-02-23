import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Chat from './components/Chat.vue';
import Login from './components/Login.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/chat', component: Chat },
    { path: '/login', component: Login }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
