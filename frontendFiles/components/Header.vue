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
      <button v-if="!isLoggedIn" class="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600" @click="$emit('showPage', 'login')">
        Войти
      </button>
      <button v-else class="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600" @click="$emit('logout')">
        Выход
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: ["isLoggedIn"],
};
</script>
