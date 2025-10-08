<template>
  <div class="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
    <span class="text-white text-3xl font-semibold"> PULSE </span>

    <div>
      <template v-for="_n in 6" :key="_n">
        <div class="circle"></div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
$circle-size: 150px;
$animation-duration: 2s;
$border-color: #fff;

.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid;
  transform-origin: center;
}

.circle:nth-child(1) {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border-image: linear-gradient(90deg, #ff006e 0%, #ff4d94 100%) 1;
  animation: curve1 1.2s ease-in-out infinite;
}

.circle:nth-child(2) {
  width: 160px;
  height: 160px;
  border-image: linear-gradient(90deg, #fb5607 0%, #ff8c42 100%) 1;
  animation: curve2 1s ease-in-out infinite;
}

.circle:nth-child(3) {
  width: 170px;
  height: 170px;
  border-image: linear-gradient(90deg, #ffbe0b 0%, #ffd60a 100%) 1;
  animation: curve3 0.8s ease-in-out infinite;
}

.circle:nth-child(4) {
  width: 180px;
  height: 180px;
  border-image: linear-gradient(90deg, #06ffa5 0%, #4dffc8 100%) 1;
  animation: curve1 1.2s ease-in-out infinite;
  animation-delay: 0.2s;
}

.circle:nth-child(5) {
  width: 190px;
  height: 190px;
  border-image: linear-gradient(90deg, #00b4d8 0%, #48cae4 100%) 1;
  animation: curve2 1s ease-in-out infinite;
  animation-delay: 0.15s;
}

.circle:nth-child(6) {
  width: 200px;
  height: 200px;
  border-image: linear-gradient(90deg, #8338ec 0%, #a56eff 100%) 1;
  animation: curve3 0.8s ease-in-out infinite;
  animation-delay: 0.1s;
}

.circle:nth-child(7) {
  width: 210px;
  height: 210px;
  border-image: linear-gradient(90deg, #3a86ff 0%, #6ba3ff 100%) 1;
  animation: curve1 1.2s ease-in-out infinite;
  animation-delay: 0.3s;
}

@keyframes curve1 {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1, 1);
    opacity: 0.5;
    border-radius: 50%;
    filter: drop-shadow(0 0 5px currentColor);
  }
  25% {
    transform: translate(-50%, -50%) scale(1.1, 0.95);
    opacity: 0.8;
    border-radius: 45% 55% 50% 50%;
    filter: drop-shadow(0 0 15px currentColor);
  }
  50% {
    transform: translate(-50%, -50%) scale(0.95, 1.1);
    opacity: 1;
    border-radius: 50% 50% 45% 55%;
    filter: drop-shadow(0 0 20px currentColor);
  }
  75% {
    transform: translate(-50%, -50%) scale(1.05, 0.98);
    opacity: 0.8;
    border-radius: 55% 45% 50% 50%;
    filter: drop-shadow(0 0 15px currentColor);
  }
}

@keyframes curve2 {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1, 1) rotate(0deg);
    opacity: 0.6;
    border-radius: 50%;
    filter: drop-shadow(0 0 5px currentColor);
  }
  33% {
    transform: translate(-50%, -50%) scale(1.08, 0.92) rotate(5deg);
    opacity: 0.9;
    border-radius: 48% 52% 53% 47%;
    filter: drop-shadow(0 0 12px currentColor);
  }
  66% {
    transform: translate(-50%, -50%) scale(0.92, 1.08) rotate(-5deg);
    opacity: 1;
    border-radius: 52% 48% 47% 53%;
    filter: drop-shadow(0 0 18px currentColor);
  }
}

@keyframes curve3 {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1, 1) rotate(0deg);
    opacity: 0.7;
    border-radius: 50%;
    filter: drop-shadow(0 0 5px currentColor);
  }
  20% {
    transform: translate(-50%, -50%) scale(1.05, 0.97) rotate(3deg);
    opacity: 0.85;
    border-radius: 46% 54% 52% 48%;
    filter: drop-shadow(0 0 10px currentColor);
  }
  40% {
    transform: translate(-50%, -50%) scale(0.97, 1.05) rotate(-3deg);
    opacity: 1;
    border-radius: 54% 46% 48% 52%;
    filter: drop-shadow(0 0 15px currentColor);
  }
  60% {
    transform: translate(-50%, -50%) scale(1.03, 0.99) rotate(2deg);
    opacity: 0.9;
    border-radius: 49% 51% 53% 47%;
    filter: drop-shadow(0 0 12px currentColor);
  }
  80% {
    transform: translate(-50%, -50%) scale(0.99, 1.03) rotate(-2deg);
    opacity: 0.85;
    border-radius: 51% 49% 47% 53%;
    filter: drop-shadow(0 0 10px currentColor);
  }
}
</style>
