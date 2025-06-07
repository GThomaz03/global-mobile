import api from "./api";

export const listarPontos = async () => {
  const response = await api.get('/Abrigos/pontos');
  return response;
};