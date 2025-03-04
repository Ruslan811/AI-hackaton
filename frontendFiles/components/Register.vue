<template>
  <div class="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl mb-4">Регистрация</h2>
    
    <input v-model="name" type="text" placeholder="Имя" class="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white">
    <input v-model="email" type="email" placeholder="Почта" class="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white">
    <input v-model="password" type="password" placeholder="Пароль" class="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white">
    <input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль" class="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white">

    <button class="w-full bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600" @click="register">
      Зарегистрироваться
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
      successMessage: ""
    };
  },
  methods: {
    async register() {
      this.errorMessage = "";
      this.successMessage = "";

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Пароли не совпадают!";
        return;
      }

      const requestData = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword // Отправляем confirmPassword
      };

      console.log("Отправка данных:", requestData);

      try {
        const response = await axios.post("http://154.59.111.79/api/auth/register", requestData);
        this.successMessage = "Регистрация успешна!";
        console.log("Ответ сервера:", response.data);
      } catch (error) {
        console.error("Ошибка:", error.response?.data);
        this.errorMessage = error.response?.data?.message || "Ошибка регистрации";
      }
    }
  }
};
</script>
