export interface ApiResponseWrapper<T> {
  success: boolean;
  data: T | null;
  error?: {
    message: string;
    code: string;
  };
}
