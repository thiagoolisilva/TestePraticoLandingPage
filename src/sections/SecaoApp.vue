<script setup>
import downloads from "../data/downloads";
</script>

<template>
    <div id="download" class="container mx-auto px-5 md:w-4/5">
        <section class="py-16 pt-18">
            <div class="w-4/5 md:w-3/5 mx-auto">
                <h2 class="text-3xl md:text-4xl font-theme-heading font-medium text-center">Nossos Aplicativos</h2>
                <p class="text-theme-grayish-blue text-center text-lg font-theme-content mt-7">Acesse nossos serviços e controle seu plano de proteção veicular diretamente do seu smartphone com nossos aplicativos intuitivos e práticos.</p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                <!-- Para cada Objeto em downloads sera feito card de aplicativo -->
                <div v-for="(download, index) in downloads" :key="download.id" :class="[index === 0 ? 'lg:mb-10' : '', index === 1 ? 'lg:mt-10' : '', index === 2 ? 'lg:mt-20 lg:-mb-10' : '']" class="shadow-lg rounded-lg">
                    <div class="flex justify-center mt-12">
                        <img :src="download.icon" alt="Browser Logo" />
                    </div>
                    <h3 class="text-2xl font-theme-heading font-medium text-center mt-6">{{ download.title }}</h3>
                    <p class="text-md font-theme-content text-theme-grayish-blue text-center mt-3">{{ download.subTitle }}</p>
                    <div class="my-7">
                        <img class="w-full" src="/images/bg-dots.svg" alt="Dot Backaground" />
                    </div>
                    <div class="flex justify-center mb-8">
                            <!-- Redirecionamento para App Store e Google Play -->
                            <a :href="download.linkg" target="_blank" rel="noopener noreferrer" class="app-download-button" >
                            <img src="/images/googlestore.png" alt="Baixar na Google Play" />
                            </a>
                            <a :href="download.linka" target="_blank" rel="noopener noreferrer" class="app-download-button" >
                            <img src="/images/appstore.png" alt="Baixar na App Store" />
                            </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
