<template>
  <header class="flex justify-between items-center px-6 py-4 bg-gray-800 shadow-md">
    <div class="flex space-x-4 ml-4">
      <button class="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600" @click="$emit('showPage', 'home')">
        Главная
      </button>
      <button class="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600" @click="$emit('showPage', 'chat')">
        Бот
      </button>
    </div>

    <div>
      <button v-if="!isLoggedIn" class="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600" @click="goToLogin">
        Войти
      </button>
      <button v-else class="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600" @click="logout">
        Выход
      </button>
    </div>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoggedIn: false, // Начальное состояние (не авторизован)
    };
  },
  created() {
    this.checkAuth(); // Проверяем авторизацию при загрузке
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem("token");
      this.isLoggedIn = !!token; // Если токен есть, значит пользователь авторизован
    },

    goToLogin() {
      this.$emit("showPage", "login");
    },

    async logout() {
      const token = localStorage.getItem("token");

      if (!token) {
        this.isLoggedIn = false;
        return;
      }

      try {
        await axios.post(
          "http://147.45.227.171/api/auth/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        localStorage.removeItem("token"); // Удаляем токен
        this.isLoggedIn = false; // Обновляем состояние кнопок
        this.$emit("showPage", "home"); // Возвращаем на главную страницу
      } catch (error) {
        console.error("Ошибка выхода:", error.response?.data || error.message);
      }
    }
  }
};
</script>
