import { ApiErrorMessage, ApiSuccessData } from "@/interfaces";
import { storage } from "@/lib/utils";
import { ApiError } from "./error";

export const makeJsonBody = (data: Record<string, unknown>): RequestInit => {
  const body = JSON.stringify(data);
  const headers: HeadersInit = { "Content-Type": "application/json" };

  return { body, headers };
};

async function tryFetch<T>(
  url: string,
  requestInit: RequestInit
): Promise<ApiSuccessData<T> | ApiErrorMessage> {
  const access_token = await storage.getToken();
  const options = {
    ...requestInit,
    headers: {
      ...requestInit.headers,
      Authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      return {
        data,
        ok: true,
      };
    }
    throw new ApiError(data);
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: error.message, ok: false };
    }
    return { message: "Erro desconhecido", ok: false };
  }
}

export async function sendPost<T>(
  url: string,
  data: Record<string, unknown>
): Promise<ApiSuccessData<T> | ApiErrorMessage> {
  return await tryFetch<T>(url, { method: "POST", ...makeJsonBody(data) });
}

export async function sendPatch<T>(
  url: string,
  data?: Record<string, unknown>
): Promise<ApiSuccessData<T> | ApiErrorMessage> {
  let requestInit: RequestInit = { method: "PATCH" };
  if (data !== undefined) {
    requestInit = {
      ...requestInit,
      ...makeJsonBody(data),
    };
  }
  return await tryFetch(url, requestInit);
}

export async function sendDelete<T>(
  url: string
): Promise<ApiSuccessData<T> | ApiErrorMessage> {
  return await tryFetch(url, { method: "DELETE" });
}

export async function sendGet<T>(
  url: string
): Promise<ApiSuccessData<T> | ApiErrorMessage> {
  return await tryFetch(url, { method: "GET" });
}
