import { Api } from "@/api/Api";
import { ApiErrorMessage, ApiSuccessData } from "@/interfaces/api";
import { AuthRequestPayload, AuthResponseData } from "@/interfaces/auth";
import { emailKey, errorKey, storage, tokenKey } from "@/lib/utils";

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
  await storage.remove(errorKey);
  if (data.ok) {
    const { access_token, email } = data.data;
    storage.setItems({
      [tokenKey]: access_token,
      [emailKey]: email,
    });
  } else {
    storage.setItems({ [errorKey]: data.message });
  }
}
