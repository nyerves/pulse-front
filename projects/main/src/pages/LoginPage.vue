<script setup lang="ts">
import LoginFormCard from '@/components/Login/LoginFormCard.vue'

const bgDataUri = `data:image/svg+xml,%3csvg width='1920' height='1080' viewBox='0 0 1920 1080' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_857_2)'%3e%3crect width='1920' height='1080' fill='url(%23paint0_linear_857_2)'/%3e%3cpath d='M-69.6133 918.002C-105.065 1025.9 -101.126 1138.27 198.247 724.524C572.464 207.34 202.186 -138.689 690.638 -116.365C816.316 -110.62 928.016 -106.262 1024.36 -102.992C1142.73 -164.065 1308.66 -134.837 1416 -94.0401C1362.43 -94.0401 1227.56 -96.0948 1024.36 -102.992C934.013 -56.3787 871.379 42.8383 883.655 229.665C919.107 769.173 1348.47 1319.84 229.76 1338.45C-665.209 1353.33 -342.726 1064.35 -69.6133 918.002Z' fill='%23FFFFFF' fill-opacity='0.5'/%3e%3cpath d='M1065.39 1187C1029.93 1294.9 1033.87 1407.27 1333.25 993.524C1707.46 476.34 1337.19 130.311 1825.64 152.635C1951.32 158.38 2063.02 162.738 2159.36 166.008C2277.73 104.935 2443.66 134.163 2551 174.96C2497.43 174.96 2362.56 172.905 2159.36 166.008C2069.01 212.621 2006.38 311.838 2018.66 498.665C2054.11 1038.17 2483.47 1588.84 1364.76 1607.45C469.791 1622.33 792.274 1333.35 1065.39 1187Z' fill='%23E5E7EB'/%3e%3cpath d='M-308.613 575.002C-344.065 682.904 -340.126 795.271 -40.7527 381.524C333.464 -135.66 -36.8135 -481.689 451.638 -459.365C577.316 -453.62 689.016 -449.262 785.357 -445.992C903.725 -507.065 1069.66 -477.837 1177 -437.04C1123.43 -437.04 988.559 -439.095 785.357 -445.992C695.013 -399.379 632.379 -300.162 644.655 -113.335C680.107 426.173 1109.47 976.843 -9.23969 995.447C-904.209 1010.33 -581.726 721.352 -308.613 575.002Z' fill='%23F3F4F6' fill-opacity='0.6'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient id='paint0_linear_857_2' x1='1644.5' y1='66' x2='120.5' y2='858' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23F9FAFB'/%3e%3cstop offset='1' stop-color='%23E5E7EB'/%3e%3c/linearGradient%3e%3cclipPath id='clip0_857_2'%3e%3crect width='1920' height='1080' fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`

const bgStyle = {
  backgroundImage: `url("${bgDataUri}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  fontFamily: "'Poppins', sans-serif",
}
</script>

<template>
  <div
    :style="bgStyle"
    class="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
  >
    <Toast />
    <LoginFormCard />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
</style>
