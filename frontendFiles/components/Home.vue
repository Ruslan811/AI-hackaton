<template>
  <div class="text-center mt-10 px-6">
    <h1 class="text-4xl font-bold">CodeBuddy – твой друг в мире программирования!</h1>
    <p class="text-lg mt-4 max-w-2xl mx-auto">
      CodeBuddy — это умный чат-бот, который помогает детям осваивать основы программирования.
    </p>
    
    <div class="mt-6">
      <button 
        class="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
        @click="$router.push('/chat')">
        Попробовать бесплатно
      </button>
    </div>
  </div>
</template>
