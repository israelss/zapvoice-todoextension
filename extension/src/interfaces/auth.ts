export type AuthRequestPayload = {
  email: string;
  password: string;
};

export type AuthResponseData = {
  email: string;
  access_token: string;
  ok: true;
};
