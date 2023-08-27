import { Api } from "@/api/Api";
import { ApiErrorMessage, ApiSuccessData } from "@/interfaces/api";
import { AuthRequestPayload, AuthResponseData } from "@/interfaces/auth";

export const login = async (payload: AuthRequestPayload) => {
  const data = await Api.auth.login(payload);
  await processData(data);
};

export const register = async (payload: AuthRequestPayload) => {
  const data = await Api.auth.register(payload);
  await processData(data);
};

async function processData(
  data: ApiSuccessData<AuthResponseData> | ApiErrorMessage
) {
  if (data.ok) {
    const { access_token, email } = data.data;
    chrome.storage.sync.set({ access_token, email });
    chrome.storage.sync.remove("authError");
  } else {
    chrome.storage.sync.set({ authError: data.message });
  }
}
