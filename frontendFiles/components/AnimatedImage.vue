<script setup>
import { ref } from "vue";
import { motion } from "framer-motion";

const isVisible = ref(false);

const showImage = () => {
  isVisible.value = true;
};

const animationConfig = {
  initial: { scale: 0.5, opacity: 0, y: 50 },
  animate: { scale: 1, opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 120 },
};
</script>

<template>
  <div class="container">
    <button @click="showImage" class="btn">Показать картинку</button>

    <div v-if="isVisible" class="image-container">
      <motion.img
        src=""
        class="image"
        v-bind="animationConfig"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  transition: 0.3s;
}

.btn:hover {
  background-color: #45a049;
}

.image-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.image {
  width: 400px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
