import { AuthRequestData, AuthResponse } from "../interfaces/interfaces";
import { post } from "./utils";

export const authApi = (apiBaseUrl: string) => ({
  login: async function ({
    email,
    password,
  }: AuthRequestData): Promise<AuthResponse | null> {
    const data = await post<AuthResponse>(`${apiBaseUrl}/auth/login`, {
      email,
      password,
    });
    if (data === null) return null;
    return data;
  },

  register: async function ({
    email,
    password,
  }: AuthRequestData): Promise<AuthResponse | null> {
    const data = await post<AuthResponse>(`${apiBaseUrl}/auth/register`, {
      email,
      password,
    });
    if (data === null) return null;
    return data;
  },
});
