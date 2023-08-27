import { Api } from "@/api/Api";
import { ApiErrorMessage, ApiSuccessData } from "@/interfaces/api";
import { AuthRequestPayload, AuthResponseData } from "@/interfaces/auth";
import { storage } from "@/lib/utils";

export const login = async (payload: AuthRequestPayload) => {
  const data = await Api.auth.login(payload);
  await processData(data);
};

export const register = async (payload: AuthRequestPayload) => {
  const data = await Api.auth.register(payload);
  await processData(data);
};

async function processData(
  data: ApiSuccessData<AuthResponseData> | ApiErrorMessage,
) {
  await storage.remove(import.meta.env.VITE_AUTH_ERROR_KEY);
  if (data.ok) {
    const { access_token, email } = data.data;
    storage.setItems({
      [import.meta.env.VITE_TOKEN_KEY]: access_token,
      [import.meta.env.VITE_EMAIL_KEY]: email,
    });
  } else {
    storage.setItems({ [import.meta.env.VITE_AUTH_ERROR_KEY]: data.message });
  }
}
