<script setup>
import features from '../data/features.js';
import { ref } from 'vue'; 

// Define uma referência reativa para controlar qual serviço está aberto
let isOpen = ref(1);
</script>

<template>
    <div id="servicos" class="container mx-auto px-5">
        <section class="py-16">
            <div class="w-4/5 md:w-3/5 mx-auto">
                <h2 class="text-3xl md:text-4xl font-semibold font-theme-heading text-center">Serviços</h2>
                <p class="text-theme-grayish-blue text-center mt-7 font-theme-content text-lg">
                    Oferecemos assistência completa em emergências, reparos e manutenção, além de suporte em viagens e carro reserva. Conte conosco para manter seu veículo sempre em movimento!
                </p>
            </div>

            <!-- Lista de características dos serviços -->
            <div class="mt-10">
                <ul class="flex flex-col items-center md:flex-row justify-center font-theme-heading">
                    <li v-for="feature in features" :key="feature.id"
                        :class="isOpen === feature.id ? 'md:border-b-4 md:border-theme-secondary' : ''"
                        class="w-full md:w-56 cursor-pointer hover:text-theme-secondary transition duration-200 border-b-2 border-t-2 md:border-t-0 flex justify-center">
                        <a @click.prevent="isOpen = feature.id" href="#"
                           :class="isOpen === feature.id ? ' border-theme-secondary' : ''"
                           class="py-5 md:border-b-0 border-b-4">
                            {{ feature.name }}
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Conteúdo detalhado dos serviços -->
            <div class="mt-16">
                <template v-for="feature in features" :key="feature.id">
                    <!-- Transição para a exibição suave do conteúdo -->
                    <transition name="fade-slide" mode="out-in">
                        <div v-show="isOpen === feature.id" class="grid gap-32 lg:grid-cols-2 items-center">
                            <div class="relative">
                                <img class="z-10 w-full max-w-lg max-h-lg rounded-lg object-cover"
                                     :src="feature.details.imageUrl" />
                                <div class="-z-10 bg-theme-primary h-52 w-96 sm:h-80 sm:w-full rounded-r-full absolute -left-56 -bottom-16"></div>
                            </div>
                            <div>
                                <h3 class="font-theme-heading text-2xl md:text-3xl font-medium text-center lg:text-left">
                                    {{ feature.details.title }}
                                </h3>
                                <p class="mt-7 font-theme-content text-lg text-theme-grayish-blue text-center lg:text-left">
                                    {{ feature.details.description }}
                                </p>
                                <div class="flex justify-center lg:justify-start mt-7">
                                    <LinkButton btn-type="primary" :link="feature.details.link">Mais Informações</LinkButton>
                                </div>
                            </div>
                        </div>
                    </transition>
                </template>
            </div>
        </section>
    </div>
</template>

<style>
/* Estilos para a transição de fade-slide */
.fade-slide-enter-active, .fade-slide-leave-active {
    transition: all 0.5s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(50%);
}
</style>
