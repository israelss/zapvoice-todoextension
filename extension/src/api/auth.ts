import { AuthRequestPayload, AuthResponseData } from "../interfaces/interfaces";
import { sendPost } from "./utils";

export const authApi = (apiBaseUrl: string) => ({
  login: async function ({
    email,
    password,
  }: AuthRequestPayload): Promise<AuthResponseData | null> {
    const data = await sendPost<AuthResponseData>(`${apiBaseUrl}/auth/login`, {
      email,
      password,
    });
    if (data === null) return null;
    return data;
  },

  register: async function ({
    email,
    password,
  }: AuthRequestPayload): Promise<AuthResponseData | null> {
    const data = await sendPost<AuthResponseData>(
      `${apiBaseUrl}/auth/register`,
      {
        email,
        password,
      }
    );
    if (data === null) return null;
    return data;
  },
});
