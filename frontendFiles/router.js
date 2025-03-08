import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Chat from "./components/Chat.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/chat", component: Chat, meta: { requiresAuth: true } }, // Защищённый маршрут
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Навигационный гард для проверки авторизации
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/register"); // Если не авторизован, перенаправляем на регистрацию
  } else {
    next();
  }
});

export default router;