<template>
  <div class="flex flex-col items-center mt-10 px-6">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl h-[600px] overflow-y-auto flex flex-col" id="chatBox">
      <div 
        v-for="message in chatMessages" 
        :key="message.id" 
        class="p-3 my-1 rounded-lg max-w-3/4 text-lg break-words"
        :class="message.user === 'me' ? 'bg-blue-500 text-white self-end' : 'bg-gray-700 text-white self-start'">
        {{ message.text }}
      </div>
      <!-- Показываем индикатор загрузки -->
      <div v-if="loading" class="p-3 my-1 rounded-lg bg-gray-700 text-white self-start">
        <span class="animate-pulse">...</span>
      </div>
    </div>

    <div class="flex mt-4 w-full max-w-4xl">
      <input 
        v-model="chatInput" 
        type="text" 
        placeholder="Введите сообщение" 
        required
        class="flex-grow px-3 py-2 rounded bg-gray-700 text-white border text-lg">
      <button 
        class="ml-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 text-lg"
        @click="sendMessage">
        Отправить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatMessages: [],
      chatInput: "",
      loading: false,
    };
  },
  created() {
    this.loadChat();
  },
  watch: {
    chatMessages: {
      handler() {
        this.saveChat();
      },
      deep: true,
    },
  },
  methods: {
    saveChat() {
      try {
        localStorage.setItem("chatMessages", JSON.stringify(this.chatMessages));
      } catch (error) {
        console.error("Ошибка сохранения чата:", error);
      }
    },
    loadChat() {
      try {
        const savedMessages = localStorage.getItem("chatMessages");
        if (savedMessages) {
          this.chatMessages = JSON.parse(savedMessages);
        }
      } catch (error) {
        console.error("Ошибка загрузки чата:", error);
        this.chatMessages = [];
      }
    },
    async sendMessage() {
      if (this.chatInput.trim() === "") return;

      const userMessage = { id: Date.now(), text: this.chatInput, user: "me" };
      this.chatMessages.push(userMessage);
      this.chatInput = "";
      this.loading = true;

      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://154.59.111.79:81/api/openai/send-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ text: userMessage.text, user: "me" }),
        });

        if (!response.ok) throw new Error(`Ошибка ${response.status}`);

        const data = await response.json();
        console.log("Ответ от сервера:", data);

        if (!data.message) {
          throw new Error("Сервер не вернул текст");
        }

        this.chatMessages.push({ id: Date.now(), text: data.message, user: "bot" });
      } catch (error) {
        console.error("Ошибка при отправке:", error);
        this.chatMessages.push({ id: Date.now(), text: "Ошибка при получении ответа", user: "bot" });
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          document.getElementById("chatBox").scrollTop = document.getElementById("chatBox").scrollHeight;
        });
      }
    }
  }
};
</script>