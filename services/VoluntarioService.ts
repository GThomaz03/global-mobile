import api from './api';
import {Voluntario} from '../types/types';


export async function getPessoas(): Promise<Voluntario[]> {
  const response = await api.get<Voluntario[]>('/Ajudantes');
  return response.data;
}

export async function getCidades(): Promise<string[]> {
  const response = await api.get<string[]>('/Ajudantes/cidades');
  return response.data;
}

export async function getTiposAjuda(): Promise<string[]> {
  const response = await api.get<string[]>('/Ajudantes/areas');
  return response.data;
}

export async function cadastraVoluntario(voluntario: Voluntario): Promise<any> {
  const response = await api.post('/Ajudantes', voluntario);
  return response;
}