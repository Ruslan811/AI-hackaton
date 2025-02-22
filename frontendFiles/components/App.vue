<template>
  <div id="app" class="bg-gray-900 text-white min-h-screen">
    <Header :isLoggedIn="isLoggedIn" @showPage="setPage" @logout="logout" />
    
    <Home v-if="currentPage === 'home'" @showRegister="setPage('register')" />
    <Chat v-if="currentPage === 'chat'" />
    <Login v-if="currentPage === 'login'" @login="handleLogin" @showRegister="setPage('register')" />
    <Register v-if="currentPage === 'register'" @register="handleRegister" />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Home from "./Home.vue";
import Chat from "./Chat.vue";
import Login from "./Login.vue";
import Register from "./Register.vue";

export default {
  components: { Header, Home, Chat, Login, Register },
  data() {
    return {
      isLoggedIn: false,
      currentPage: "home",
    };
  },
  methods: {
    setPage(page) {
      this.currentPage = page;
    },
    handleLogin() {
      this.isLoggedIn = true;
      this.setPage("home");
    },
    handleRegister() {
      this.isLoggedIn = true;
      this.setPage("home");
    },
    logout() {
      this.isLoggedIn = false;
      this.setPage("home");
    }
  }
};
</script>
