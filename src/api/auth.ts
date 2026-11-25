import api from './client';


export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export async function login(data: LoginData): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/api/login', data);
  return response.data;
}