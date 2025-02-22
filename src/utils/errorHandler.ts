import type { AxiosError } from "axios";
import createError from "http-errors";

interface FacebookErrorResponse {
  error?: {
    message: string;
    type: string;
    code: number;
    fbtrace_id: string;
  };
}

// Properly check if the error is an AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError)?.isAxiosError === true;
}

export const handleApiError = (error: unknown, defaultMessage: string): never => {
  if (isAxiosError(error)) {
    const statusCode = error.response?.status || 500;
    const fbError = error.response?.data as FacebookErrorResponse | undefined;
    const errorMessage = fbError?.error?.message || error.message || defaultMessage;

    throw createError(statusCode, errorMessage);
  }

  if (error instanceof Error) {
    throw createError(500, error.message || defaultMessage);
  }

  throw createError(500, defaultMessage);
};
