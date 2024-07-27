import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Accept': 'application/json'
  }
});

export default {
  //Oficina
  async getOficinas(codigo, cpf) {
    try {
      let response;
      if (cpf) {
        response = await apiClient.get(`/Api/Oficina?codigoAssociacao=${codigo}&cpfAssociado=${cpf}`);
      } else {
        response = await apiClient.get(`/Api/Oficina?codigoAssociacao=${codigo}`);
      }
      
      return response;

    } catch (error) {
      throw error;
    }
  },

  //Indicação
  postIndicacao(indicacao) {
    return apiClient.post('/Api/Indicacao', indicacao);
  }
};
