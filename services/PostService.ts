import api from "./api";
import { Post } from "../types/types";


export const listarPosts = async () => {
  const response = await api.get<Post[]>("/Posts");
  return response;
}

export const buscarPostPorId = async (id: number) => {
  const response = await api.get<Post>(`/Posts/${id}`);
  return response;
};

export const criarPost = async (post: Post) => {
  const response = await api.post<Post>("/Posts", post);
  return response;
};

