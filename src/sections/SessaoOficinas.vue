<script setup>
import { ref } from "vue";
import api from '../api';
import Swal from "sweetalert2";

let codigo = ref("");
let cpf = ref("");
let oficinas = ref([]);
let error = ref(false);
let oficina0 = ref(false);

const enviaFormulario = async () => {
  if (!codigo.value) {
    error.value = true;
  } else {
    try {
      const response = await api.getOficinas(codigo.value, cpf.value);
      if (response.length === 0) {
        oficina0.value = true;
        oficinas.value = [];
      } else {
        oficinas.value = response;
        oficina0.value = false;
        Swal.fire({
          icon: 'success',
          title: 'Oficinas Encontradas',
          text: `${response.length} oficina(s) encontrada(s).`
        });
      }
    } catch (error) {
        oficina0.value = true;
        oficinas.value = [];
    }
  }
};

// Função para formatar o telefone
const formatTelefone = (telefone) => {
  // Extrair apenas números
  const telefoneStr = telefone.toString();
  return telefoneStr.replace(/\D/g, ''); // Remove caracteres não numéricos
};
</script>

<template>
  <div id="busca-oficina" class="bg-theme-primary mt-10">
    <div class="container w-full lg:w-2/5 mx-auto px-5">
      <section class="py-16">
        <h4 class="text-sm tracking-widest uppercase text-center text-white font-theme-heading">35,000+ Oficinas parceiras</h4>
        <h2 class="text-3xl md:text-4xl font-medium text-center text-white mt-9 mb-10 font-theme-heading">Busque a mais próxima de você!</h2>

        <form @submit.prevent="enviaFormulario">
          <div class="relative flex flex-col items-center lg:flex-row justify-center lg:space-x-3">
            <div class="relative w-full lg:mb-0 font-theme-content">
              <input v-model="codigo" @input="error = false" class="w-full py-3 px-5 text-sm text-gray-600 border-0 shadow-md rounded focus:ring-4 focus:ring-blue-300" type="text" placeholder="Código da Oficina" />
            </div>
            <div class="relative w-full lg:mb-0 font-theme-content">
              <input v-model="cpf" @input="error = false" class="w-full py-3 px-5 text-sm text-gray-600 border-0 shadow-md rounded focus:ring-4 focus:ring-blue-300" type="text" placeholder="CPF" />
            </div>
            <Button type="submit" btn-type="secondary">Buscar</Button>
          </div>
          <div v-if="error" class="text-red-500 mt-3">Por favor, insira o código e o CPF existente.</div>
          <div v-if="oficina0" class="text-red-500 mt-3">Nenhuma oficina encontrada.</div>
        </form>

        <div v-if="oficinas.length > 0" class="mt-10 text-white">
          <h3 class="text-2xl">Detalhes das Oficinas</h3>
          <div v-for="(oficina, index) in oficinas" :key="index" class="mb-4">
            <p><strong>Nome:</strong> {{ oficina.d2p1_Nome }}</p>
            <p><strong>Endereço:</strong> {{ oficina.d2p1_Endereco }}</p>
            <p><strong>Telefone:</strong> {{ formatTelefone(oficina.d2p1_Telefone1) }}</p>
            <p><strong>Descrição:</strong> {{ oficina.d2p1_DescricaoCurta }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

