import {
  ApiErrorMessage,
  ApiSuccessData,
  AuthRequestPayload,
  AuthResponseData,
} from "@/interfaces";
import { sendPost } from "./utils";

export const authApi = (apiBaseUrl: string) => ({
  login: async function ({
    email,
    password,
  }: AuthRequestPayload): Promise<
    ApiSuccessData<AuthResponseData> | ApiErrorMessage
  > {
    return await sendPost<AuthResponseData>(`${apiBaseUrl}/auth/login`, {
      email,
      password,
    });
  },

  register: async function ({
    email,
    password,
  }: AuthRequestPayload): Promise<
    ApiSuccessData<AuthResponseData> | ApiErrorMessage
  > {
    return await sendPost<AuthResponseData>(`${apiBaseUrl}/auth/register`, {
      email,
      password,
    });
  },
});
