export type ApiError = {
  error: string;
  message: string;
  statusCode: number;
};

export type ApiErrorMessage = Pick<ApiError, "message"> & {
  ok: false;
};

export type ApiSuccessData<T> = {
  data: T;
  ok: true;
};
