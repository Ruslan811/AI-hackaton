<template>
  <div class="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl mb-4">Войти</h2>

    <input v-model="email" type="email" placeholder="Почта" class="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white">
    <input v-model="password" type="password" placeholder="Пароль" class="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white">

    <button class="w-full bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600" @click="login">
      Войти
    </button>

    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-500 mt-2">{{ successMessage }}</p>

    <p class="mt-4 text-sm text-gray-400">Нет аккаунта? 
      <span class="text-blue-400 cursor-pointer" @click="$emit('showRegister')">Зарегистрироваться</span>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async login() {
      this.errorMessage = "";
      this.successMessage = "";

      const requestData = {
        email: this.email,
        password: this.password
      };

      try {
        const response = await axios.post("http://147.45.227.171/api/auth/login", requestData);
        this.successMessage = "Вход выполнен успешно!";
        console.log("Ответ сервера:", response.data);

        // Сохраняем токен в localStorage для дальнейшего использования
        localStorage.setItem("token", response.data.access_token);
      } catch (error) {
        console.error("Ошибка:", error.response?.data);
        this.errorMessage = error.response?.data?.message || "Ошибка входа";
      }
    }
  }
};
</script>
