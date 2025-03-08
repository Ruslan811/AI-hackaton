<template>
  <div id="app" class="bg-gray-900 text-white min-h-screen">
    <Header />

    <router-view />
  </div>
</template>

<script>
import { provide, ref } from "vue";
import Header from "./Header.vue";

export default {
  components: { Header },
  setup() {
    const isLoggedIn = ref(false);

    const login = () => {
      isLoggedIn.value = true;
    };

    const logout = () => {
      isLoggedIn.value = false;
      window.localStorage.removeItem("isLoggedIn"); // Сохранение состояния
    };

    provide("isLoggedIn", isLoggedIn);
    provide("login", login);
    provide("logout", logout);

    return { isLoggedIn, login, logout };
  },
};
</script>