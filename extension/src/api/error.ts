export class ApiError extends Error {
  statusCode: number;
  error: string;
  constructor({
    message,
    statusCode,
    error,
  }: {
    message: string;
    statusCode: number;
    error: string;
  }) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
}
