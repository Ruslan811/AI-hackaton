<template>
  <div class="flex flex-col items-center mt-10 px-6">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl h-96 overflow-y-auto flex flex-col" id="chatBox">
      <div v-for="message in chatMessages" :key="message.id" class="p-2 my-1 rounded-lg"
        :class="message.user === 'me' ? 'bg-blue-500 self-end' : 'bg-gray-700 self-start'">
        {{ message.text }}
      </div>
    </div>
    <div class="flex mt-4 w-full max-w-2xl">
      <input v-model="chatInput" type="text" placeholder="Введите сообщение" required
        class="flex-grow px-3 py-2 rounded bg-gray-700 text-white border">
      <button class="ml-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600" @click="sendMessage">
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
      chatInput: ""
    };
  },
  methods: {
    sendMessage() {
      if (this.chatInput.trim() === "") return;
      this.chatMessages.push({ id: Date.now(), text: this.chatInput, user: "me" });
      this.chatInput = "";
      this.$nextTick(() => {
        const chatBox = document.getElementById("chatBox");
        chatBox.scrollTop = chatBox.scrollHeight;
      });
    }
  }
};
</script>
