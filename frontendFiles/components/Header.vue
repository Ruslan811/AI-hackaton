<template>
  <header
    class="flex justify-between items-center px-6 py-4 bg-gray-800 shadow-md"
  >
    <div class="flex space-x-4 ml-4">
      <button
        class="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        @click="$router.push('/')"
      >
        Главная
      </button>
      <button
        class="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        @click="$router.push('/chat')"
      >
        Бот
      </button>
    </div>

    <div>
      <button
        v-if="!isLoggedIn"
        class="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
        @click="$router.push('/login')"
      >
        Войти
      </button>
      <button
        v-else
        class="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        @click="logout"
      >
        Выйти
      </button>
    </div>
  </header>

  <p v-if="errorMessage" class="text-red-500 mt-2 text-center">
    {{ errorMessage }}
  </p>
  <p v-if="successMessage" class="text-green-500 mt-2 text-center">
    {{ successMessage }}
  </p>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("token"), // Сразу проверяем состояние
      errorMessage: "",
      successMessage: "",
    };
  },
  mounted() {
    window.addEventListener("storage", this.syncAuthState);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.syncAuthState);
  },
  watch: {
    // Следим за изменениями токена в localStorage
    isLoggedIn(newValue) {
      console.log("Статус входа изменился:", newValue);
    },
  },
  methods: {
    syncAuthState() {
      this.isLoggedIn = !!localStorage.getItem("token");
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
        await axios.post(
          "http://154.59.111.79:81/api/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        this.successMessage = "Вы успешно вышли!";
        localStorage.removeItem("token");

        this.isLoggedIn = false; // Мгновенно обновляем UI
        this.$router.push("/");
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Ошибка выхода";
      }
    },

    loginSuccess(token) {
      localStorage.setItem("token", token);
      this.isLoggedIn = true; // Мгновенно обновляем UI
    },
  },
};
</script>