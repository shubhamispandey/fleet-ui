import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  withCredentials: true,
});

const setAuthorizationHeaders = (): {
  accessToken?: string;
  userId?: string;
} => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  if (accessToken && userId) {
    return { accessToken, userId };
  }
  return {};
};

api.interceptors.request.use(
  (config: any) => {
    const headers = setAuthorizationHeaders();
    config.headers = {
      ...config.headers,
      ...headers,
    };
    return config;
  },
  (error: any) => {
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

interface ApiCallParams {
  url: string;
  method?: HttpMethod;
  data?: any;
  customHeaders?: Record<string, string>;
  responseType?: ResponseType;
}

// The function definition with TypeScript
const makeApiCall = async <T>({
  url,
  method = "GET",
  data = null,
  customHeaders = {},
  responseType = "json",
}: ApiCallParams): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.request({
      url,
      method,
      data,
      headers: customHeaders,
      responseType,
    });

    return response.data;
  } catch (error: any) {
    if (error?.response?.data?.status === 0) {
      localStorage.clear();
      window.location.href = "/login";
    }
    throw error;
  }
};

export default makeApiCall;
