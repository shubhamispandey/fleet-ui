import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import tokenManager from "./tokenManager";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  withCredentials: true,
});

const setAuthorizationHeaders = (): Record<string, string> => {
  const accessToken = tokenManager.getToken();
  const userId = localStorage.getItem("userId");
  const headers: Record<string, string> = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  if (userId) headers["X-User-Id"] = userId;
  return headers;
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const headers = setAuthorizationHeaders();
    Object.entries(headers).forEach(([key, value]) => {
      if (value) config.headers.set?.(key, value);
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Function to make API call
 * @param {string} url - The API endpoint URL
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} data - Request data (optional)
 * @param {Object} customHeaders - Custom headers (optional)
 * @returns {Promise} - A promise that resolves with response data or rejects with an error
 */
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type ResponseType = "json" | "blob" | "text" | "arraybuffer" | "document";

type ApiCallParams = {
  url: string;
  method?: HttpMethod;
  data?: unknown;
  params?: Record<string, unknown>;
  customHeaders?: Record<string, string>;
  responseType?: ResponseType;
};

const makeApiCall = async <T>({
  url,
  method = "GET",
  data = null,
  params = {}, // <-- Accept query params here
  customHeaders = {},
  responseType = "json",
}: ApiCallParams): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.request({
      url,
      method,
      data,
      params, // <-- Pass to Axios
      headers: customHeaders,
      responseType,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.status === 0) {
      tokenManager.clearToken();
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }
    throw error;
  }
};

export default makeApiCall;
