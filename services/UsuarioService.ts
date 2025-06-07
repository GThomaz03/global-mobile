import api from './api';
import { Usuario } from '../types/types';

export const listarUsuarios = async () => {
  const response = await api.get('/usuarios');
  return response;
};

export const buscarUsuarioPorId = async (id: number) => {
  const response = await api.get(`/usuarios/${id}`);
  return response;
};

export const criarUsuario = async (usuario: Usuario) => {
  const response = await api.post('/usuarios', usuario);
  return response;
};

export const editarUsuario = (id: number, dadosAtualizados: Partial<Usuario>) => {
  const response = api.put(`/usuarios/${id}`, dadosAtualizados);
  return response;
};

export const deletarUsuario = async (id: number) => {
  await api.delete(`/usuarios/${id}`);
  return { status: 200, message: 'Usuário deletado com sucesso' };
};

export const loginUsuario = async (email: string, senha: string) => {
  const response = await api.post('/usuarios/login', { email, senha });
  return response;
};