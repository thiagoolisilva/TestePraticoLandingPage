<script setup>
import { ref } from 'vue';
import api from '../api';
import Swal from "sweetalert2";

const amigos = ref({});

const isOpen = ref(false);

const submitForm = async () => {
  if (!amigos.value.codigoAssociacao || !amigos.value.cpfAssociado || 
  !amigos.value.emailAssociado || !amigos.value.nomeAssociado || 
  !amigos.value.telefoneAssociado || !amigos.value.placaVeiculoAssociado || 
  !amigos.value.nomeAmigo || !amigos.value.telefoneAmigo || !amigos.value.emailAmigo) 
  {
    error.value = true;
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Por favor, preencha todos os campos obrigatórios.',
    });
  } else {
    try {
      const response = await api.postIndicacao(amigos.value);
      
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Dados enviados com sucesso.',
      });

      // Limpar o formulário
      amigos.value = {};
      isOpen.value = false;

    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Ocorreu um erro ao enviar os dados.',
      });
    }
  }
};
</script>

<template>
  <div id="indicacao" class="container mx-auto px-5 md:w-4/5">
    <section class="py-16 pt-18">
      <div class="w-4/5 md:w-3/5 mx-auto">
        <h2 class="text-3xl md:text-4xl font-theme-heading font-medium text-center">Indicação de Amigos</h2>
        <p class="text-theme-grayish-blue text-center mt-7 font-theme-content text-lg">Indique seus amigos preenchendo o formulário abaixo. Nós entraremos em contato com eles.</p>
      </div>

      <div class="mt-10 w-full lg:w-3/5 mx-auto">
        <ul class="shadow-lg">
          <!-- Abre formulario ao clicar -->
          <li @click="isOpen = !isOpen" :class="isOpen ? 'text-theme-secondary' : ''" class="font-theme-content font-medium text-xl cursor-pointer hover:text-theme-secondary py-5 flex justify-between items-center transition duration-200 bg-slate-100 px-6">
            <span>Formulário de Indicação</span>
            <svg :class="isOpen ? 'rotate-180 text-theme-secondary' : 'rotate-0 text-theme-primary'" class="transform" xmlns="http://www.w3.org/2000/svg" width="18" height="12">
              <path fill="none" stroke="currentColor" stroke-width="3" d="M1 1l8 8 8-8" />
            </svg>
          </li>
          <div v-show="isOpen" class="bg-slate-50 px-6 py-4">
            <form @submit.prevent="submitForm">
              <!-- Campos do associado -->
              <div class="mb-6 p-4 shadow-lg bg-slate-100 rounded">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Código da Associação -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-1" for="codigoAssociacao">Código da Associação</label>
                    <input v-model="amigos.codigoAssociacao" class="w-full py-2 px-3 text-sm text-gray-600 border border-gray-300 rounded" type="text" id="codigoAssociacao" placeholder="Código da Associação" required />
                  </div>
                  <!-- Data de Criação -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-1" for="dataCriacao">Data de Criação</label>
                    <input v-model="amigos.dataCriacao" class="w-full py-2 px-3 text-sm text-gray-600 border border-gray-300 rounded" type="date" id="dataCriacao" placeholder="Data de Criação" required />
                  </div>
                  <!-- CPF do Associado -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-1" for="cpfAssociado">CPF do Associado</label>
                    <input v-model="amigos.cpfAssociado" class="w-full py-2 px-3 text-sm text-gray-600 border border-gray-300 rounded" type="text" id="cpfAssociado" placeholder="CPF do Associado" required />
                  </div>
                  <!-- E-mail do Associado -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-1" for="emailAssociado">E-mail do Associado</label>
                    <input v-model="amigos.emailAssociado" class="w-full py-2 px-3 text-sm text-gray-600 border border-gray-300 rounded" type="email" id="emailAssociado" placeholder="E-mail do Associado" required />
                  </div>
                  <!-- Nome do Associado -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-1" for="nomeAssociado">Nome do Associado</label>
                    <input v-model="amigos.nomeAssociado" class="w-full py-2 px-3 text-sm text-gray-600 border border-gray-300 rounded" type="text" id="nomeAssociado" placeholder="Nome do Associado" required />
                  </div>
                  <!-- Telefone do Associado -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-1" for="telefoneAssociado">Telefone do Associado</label>
                    <input v-model="amigos.telefoneAssociado" class="w-full py-2 px-3 text-sm text-gray-600 border border-gray-300 rounded" type="text" id="telefoneAssociado" placeholder="Telefone do Associado" required />
                  </div>
                  <!-- Placa do Veículo -->
                  <div class="mb-4">
                    <label class="block text-sm font-medium mb-1" for="placaVeiculoAssociado">Placa do Veículo</label>
                    <input v-model="amigos.placaVeiculoAssociado" class="w-full py-2 px-3 text-sm text-gray-600 border border-gray-300 rounded" type="text" id="placaVeiculoAssociado" placeholder="Placa do Veículo" required />
                  </div>
                </div>
              </div>

              <!-- Campos de informações do amigo -->
              <div class="mb-6 p-4 rounded">
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-1" for="nomeAmigo">Nome do Amigo</label>
                  <input v-model="amigos.nomeAmigo" class="w-full py-2 px-3 text-sm text-gray-600 border border-gray-300 rounded" type="text" id="nomeAmigo" placeholder="Nome do Amigo" required />
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-1" for="telefoneAmigo">Telefone</label>
                  <input v-model="amigos.telefoneAmigo" class="w-full py-2 px-3 text-sm text-gray-600 border border-gray-300 rounded" type="text" id="telefoneAmigo" placeholder="Telefone" required />
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-1" for="emailAmigo">E-mail</label>
                  <input v-model="amigos.emailAmigo" class="w-full py-2 px-3 text-sm text-gray-600 border border-gray-300 rounded" type="email" id="emailAmigo" placeholder="E-mail" required />
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-1" for="observacao">Observação</label>
                  <textarea v-model="amigos.observacao" class="w-full py-2 px-3 text-sm text-gray-600 border border-gray-300 rounded" id="observacao" placeholder="Observação" rows="3"></textarea>
                </div>
              </div>

              <div class="flex justify-end mt-8">
                <Button type="submit" btn-type="secondary">Enviar Indicações</Button>
              </div>
            </form>
          </div>
        </ul>
      </div>
    </section>
  </div>
</template>
