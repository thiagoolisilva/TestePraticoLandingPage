<script setup>
import { ref } from "vue";
import api from '../api';
import Swal from "sweetalert2";

let codigo = ref("");
let cpf = ref("");
let oficinas = ref([]);
let error = ref(false);
let oficina0 = ref(false);

// Função para enviar o formulário e buscar oficinas
const enviaFormulario = async () => {
  if (!codigo.value) {
    error.value = true;
  } else {
    try {
      // Faz a requisição à API para buscar oficinas com base no código e CPF
      const response = await api.getOficinas(codigo.value, cpf.value);
      
      // Verifica se a resposta da API contém oficinas
      if (response.data.ListaOficinas.length === 0) {
        oficina0.value = true;
        oficinas.value = [];
      } else {
        oficinas.value = response.data.ListaOficinas;
        oficina0.value = false;
        
        // Exibe uma mensagem de sucesso
        Swal.fire({
          icon: 'success',
          title: 'Oficinas Encontradas',
          text: `${response.data.ListaOficinas.length} oficina(s) encontrada(s).`,
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      // Define estados de erro e limpa a lista de oficinas em caso de falha
      oficina0.value = true;
      oficinas.value = [];
    }
  }
};
</script>

<template>
  <div id="busca-oficina" class="bg-theme-primary mt-10">
    <div class="container w-full lg:w-2/5 mx-auto px-5">
      <section class="py-16">
        <h4 class="text-sm tracking-widest uppercase text-center text-white font-theme-heading">35,000+ Oficinas parceiras</h4>
        <h2 class="text-3xl md:text-4xl font-medium text-center text-white mt-9 mb-10 font-theme-heading">Busque a mais próxima de você!</h2>

        <!-- Formulário para busca de oficinas -->
        <form @submit.prevent="enviaFormulario">
          <div class="relative flex flex-col items-center lg:flex-row justify-center lg:space-x-3">
            <div class="relative w-full lg:mb-0 font-theme-content mb-2">
              <input v-model="codigo" @input="error = false" class="w-full py-3 px-5 text-sm text-gray-600 border-0 shadow-md rounded focus:ring-4 focus:ring-blue-300" type="text" placeholder="Código da Oficina" />
            </div>
            <div class="relative w-full lg:mb-0 font-theme-content">
              <input v-model="cpf" @input="error = false" class="w-full py-3 px-5 text-sm text-gray-600 border-0 shadow-md rounded focus:ring-4 focus:ring-blue-300" type="text" placeholder="CPF" />
            </div>
            <Button type="submit" btn-type="secondary">Buscar</Button>
          </div>
          <!-- Mensagens de erro -->
          <div v-if="error" class="text-sm tracking-widest text-center text-white font-theme-heading mt-5">Por favor, insira o código e o CPF existentes</div>
          <div v-if="oficina0" class="text-sm tracking-widest text-center text-white font-theme-heading mt-5">Nenhuma oficina encontrada</div>
        </form>

        <!-- Exibição dos detalhes das oficinas -->
        <div v-if="oficinas.length > 0" class="mt-10 text-white">
          <h3 class="text-2xl">Detalhes das Oficinas</h3>
          <div v-for="(oficina, index) in oficinas" :key="index" class="mb-2 shadow-md mt-2">
            <p class="ml-1"><strong>Nome:</strong> {{ oficina.Nome }}</p>
            <p class="ml-1"><strong>Endereço:</strong> {{ oficina.Endereco }}</p>
            <p class="ml-1"><strong>Telefone:</strong> {{ oficina.Telefone1 }}</p>
            <p class="ml-1"><strong>Descrição:</strong> {{ oficina.DescricaoCurta }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
