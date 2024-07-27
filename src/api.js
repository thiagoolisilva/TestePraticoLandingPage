import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Accept': 'application/xml'
  }
});

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  parseAttributeValue: true,
  transformTagName: (tagName) => tagName.replace(/:/g, '_')
});

export default {
  //Oficina
  async getOficinas(codigo, cpf) {
    console.log("teste");
    try {
      let response;
      if (cpf) {
        response = await apiClient.get(`/Api/Oficina?codigoAssociacao=${codigo}&cpfAssociado=${cpf}`);
      } else {
        response = await apiClient.get(`/Api/Oficina?codigoAssociacao=${codigo}`);
      }
      
      const result = parser.parse(response.data);
      const oficinas = result.ClasseRetornoOficina.ListaOficinas.d2p1_ClasseOficina;
      console.log(oficinas);
      return oficinas;
    } catch (error) {
      throw error;
    }
  },

  //Indicação
  postIndicacao(indicacao) {
    return apiClient.post('/Api/Indicacao', indicacao);
  }
};
