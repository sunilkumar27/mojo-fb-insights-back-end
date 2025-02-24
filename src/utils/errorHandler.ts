import type { AxiosError } from "axios";

// Properly check if the error is an AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError)?.isAxiosError === true;
}
