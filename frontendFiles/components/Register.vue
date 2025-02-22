
<template>
  <div class="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl mb-4">Регистрация</h2>
    <input v-model="name" type="text" placeholder="Имя" class="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white">
    <input v-model="email" type="email" placeholder="Почта" class="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white">
    <input v-model="password" type="password" placeholder="Пароль" class="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white">
    <input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль" class="w-full px-3 py-2 mb-2 rounded bg-gray-700 text-white">
    <button class="w-full bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600" @click="$emit('register')">
      Зарегистрироваться
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return { name: "", email: "", password: "", confirmPassword: "" };
  }
};
</script>
