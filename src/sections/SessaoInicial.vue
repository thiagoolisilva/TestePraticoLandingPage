<script setup>
import { ref, onMounted } from 'vue';

// Lista de URLs de imagens
const imageUrls = [
  '/images/driver-main.jpg',
  '/images/driver-main2.jpg',
  '/images/driver-main3.jpg'
];

// Ref para armazenar a URL da imagem atual
const currentImage = ref('');

// Função para selecionar uma imagem aleatória
function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
}

// Função para gerar um parâmetro de cache-busting
function generateCacheBuster() {
  return `?v=${Date.now()}`;
}

// Quando o componente for montado, defina a URL da imagem aleatória com cache-busting
onMounted(() => {
  currentImage.value = `${getRandomImage()}${generateCacheBuster()}`;
});
</script>

<template>
  <div class="container mx-auto px-5 overflow-x-hidden lg:overflow-x-visible">
    <section class="grid grid-cols-none lg:grid-cols-2 pb-16 pt-8 items-center">
      <div class="lg:w-5/6 order-2 lg:order-none">
        <h1 class="text-4xl xl:text-5xl font-bold font-theme-heading text-center lg:text-left">Proteção Veicular</h1>
        <p class="lg:text-xl mt-10 font-theme-content text-theme-grayish-blue text-center lg:text-left">Garanta a segurança do seu veículo com nossa assistência e planos personalizados. Confie em quem entende de proteção!</p>
        <div class="flex justify-center lg:justify-start mt-10">
          <LinkButton btn-type="primary" link="#download-section">Seja um Associado</LinkButton>
        </div>
      </div>
      <div class="relative order-1 lg:order-none mb-20 lg:mt-0 lg:mb-0 lg:-mr-10 transition-slide-in">
        <img class="z-10 w-full rounded-lg" :src="currentImage" />
        <div class="-z-10 bg-theme-primary h-52 w-full sm:h-80 sm:w-full rounded-l-full absolute -right-28 md:-right-48 -bottom-8"></div>
      </div>
    </section>
  </div>
</template>

<style>
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.transition-slide-in {
  animation: slideIn 0.5s ease-out forwards;
}
</style>
