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
        Выйти
      </button>
    </div>
  </header>

  <p v-if="errorMessage" class="text-red-500 mt-2 text-center">{{ errorMessage }}</p>
  <p v-if="successMessage" class="text-green-500 mt-2 text-center">{{ successMessage }}</p>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLoggedIn: false, 
      errorMessage: "",
      successMessage: "",
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem("token");
      this.isLoggedIn = !!token;
    },

    goToLogin() {
      this.$emit("showPage", "login");
    },

    async logout() {
      this.errorMessage = "";
      this.successMessage = "";

      const token = localStorage.getItem("token");

      if (!token) {
        this.isLoggedIn = false;
        return;
      }

      try {
        await axios.delete("http://147.45.227.171/api/auth/logout", {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        });

        this.successMessage = "Вы успешно вышли!";
        localStorage.removeItem("token");
        this.isLoggedIn = false;
        this.$emit("showPage", "home");

      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Ошибка выхода";
      }
    },
  },
};
</script>
