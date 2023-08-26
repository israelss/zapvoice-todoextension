export const makeJsonBody = (data: Record<string, unknown>): RequestInit => {
  const body = JSON.stringify(data);
  const headers: HeadersInit = { "Content-Type": "application/json" };

  return { body, headers };
};

async function tryFetch(url: string, requestInit: RequestInit) {
  const access_token = (await chrome.storage.sync.get("access_token"))[
    "access_token"
  ];
  const options = {
    ...requestInit,
    headers: {
      ...requestInit.headers,
      Authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function sendPost<T>(
  url: string,
  data: Record<string, unknown>
): Promise<T | null> {
  const requestInit: RequestInit = { method: "POST", ...makeJsonBody(data) };
  return await tryFetch(url, requestInit);
}

export async function sendPatch<T>(
  url: string,
  data?: Record<string, unknown>
): Promise<T | null> {
  let requestInit: RequestInit = { method: "PATCH" };
  if (data !== undefined) {
    requestInit = {
      ...requestInit,
      ...makeJsonBody(data),
    };
  }
  return await tryFetch(url, requestInit);
}

export async function sendDelete<T>(url: string): Promise<T | null> {
  const requestInit: RequestInit = { method: "DELETE" };
  return await tryFetch(url, requestInit);
}

export async function sendGet<T>(url: string): Promise<T | null> {
  const requestInit: RequestInit = { method: "GET" };
  return await tryFetch(url, requestInit);
}
