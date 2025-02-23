<template>
    <div class="text-center mt-6">
      <button class="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 text-white" @click="logout">
        Выйти
      </button>
  
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-500 mt-2">{{ successMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        errorMessage: "",
        successMessage: "",
      };
    },
    methods: {
      async logout() {
        this.errorMessage = "";
        this.successMessage = "";
  
        const token = localStorage.getItem("token"); // Получаем токен из localStorage
  
        if (!token) {
          this.errorMessage = "Вы не авторизованы!";
          return;
        }
  
        try {
          const response = await axios.post(
            "http://147.45.227.171/api/auth/logout",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
  
          this.successMessage = "Вы успешно вышли!";
          console.log("Ответ сервера:", response.data);
  
          localStorage.removeItem("token"); // Удаляем токен при выходе
        } catch (error) {
          console.error("Ошибка:", error.response?.data);
          this.errorMessage = error.response?.data?.message || "Ошибка выхода";
        }
      }
    }
  };
  </script>
  