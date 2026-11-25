import api from './client';
import type { Post } from '../store/postsStore';

export async function getPosts(): Promise<Post[]> {
  const response = await api.get<Post[]>('/api/posts');
  return response.data;
}

export async function getPost(id: string): Promise<Post> {
  const response = await api.get<Post>(`/api/posts/${id}`);
  return response.data;
}