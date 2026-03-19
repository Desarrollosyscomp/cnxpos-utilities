<template>
  <BaseModal :onClose="onCancel">
    <template>
      <div class="timer-content">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <div class="progress-container">
          <div
            class="progress-bar"
            :style="{
              width: progress + '%',
              backgroundColor: progressColor,
              transition: 'none' // Eliminamos la transición para animación continua
            }"
          ></div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import BaseModal from "../BaseModal.vue";

const props = defineProps<{
  title: string;
  message: string;
  time: number;
  onResolve: (value: boolean) => void;
}>();

const progress = ref(100);
const timeLeft = ref(props.time);
const progressColor = ref("green");
let startTime: number;
let animationFrameId: number;
// let colorTitle = ref("");

// Puede servir para cambiar el color del titulo
// const changeColorTitle = () => {
//   if (props.title == "Error") {
//     colorTitle.value = "red";
//   } else {
//     colorTitle.value = "green";
//   }
// }

onMounted(() => {
  startTime = Date.now();
  animateProgress();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
});

function animateProgress() {
  const elapsed = (Date.now() - startTime) / 1000; // Tiempo transcurrido en segundos
  timeLeft.value = Math.max(0, props.time - elapsed);
  progress.value = (timeLeft.value / props.time) * 100;

  // Cambiar color según el tiempo restante
  progressColor.value = "darkblue";

  // changeColorTitle();

  // Si el tiempo no se ha agotado, continuar la animación
  if (timeLeft.value > 0) {
    animationFrameId = requestAnimationFrame(animateProgress);
  } else {
    props.onResolve(false); // Tiempo agotado
  }
}

function onCancel() {
  cancelAnimationFrame(animationFrameId);
  props.onResolve(true); // Usuario cerró manualmente
}
</script>

<style scoped>
.timer-content {
  text-align: center;
  position:relative;
}

.progress-container {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin: 20px 0;
  overflow: hidden;
}

.progress-bar {
  position:absolute;
  bottom: 0;
  height: 8px;
  border-radius: 4px;
}

.time-left {
  font-size: 0.9em;
  color: #666;
}
</style>
