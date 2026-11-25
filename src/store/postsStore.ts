import { create } from 'zustand';
import { getPosts } from '../api/posts';
import type { AsyncState } from '../types/async';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  likes: number;
}

interface PostsState {
  state: AsyncState<Post[]>;
  fetchPosts: () => Promise<void>;
}

export const usePostsStore = create<PostsState>((set) => ({
  state: { status: 'idle' },

  fetchPosts: async () => {
    set({ state: { status: 'loading' } });
    try {
      const data = await getPosts();
      set({ state: { status: 'success', data } });
    } catch {
      set({ state: { status: 'error', error: 'Не удалось загрузить посты' } });
    }
  },
}));