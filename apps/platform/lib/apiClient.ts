export class ApiError extends Error {
  status: number;
  errors?: any[];

  constructor(message: string, status: number, errors?: any[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface RequestOptions extends RequestInit {
  data?: any;
}

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

export const setAuthToken = (token: string | null): void => {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
};

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { data, headers: customHeaders, ...customConfig } = options;

  const token = getAuthToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };

  const config: RequestInit = {
    method: data ? "POST" : "GET",
    headers,
    credentials: "include",
    ...(data ? { body: JSON.stringify(data) } : {}),
    ...customConfig,
  };

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, config);

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      setAuthToken(null);
      window.dispatchEvent(new CustomEvent("unauthorized_session"));
    }
  }

  let resultData: any;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    resultData = await response.json();
  } else {
    resultData = await response.text();
  }

  if (!response.ok) {
    const errorMessage =
      (typeof resultData === "object" && resultData?.message) ||
      response.statusText ||
      "An unexpected API error occurred";

    const errorsArray = typeof resultData === "object" ? resultData?.errors : undefined;

    throw new ApiError(errorMessage, response.status, errorsArray);
  }

  return resultData as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options: RequestOptions = {}) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: any, options: RequestOptions = {}) =>
    request<T>(endpoint, { ...options, method: "POST", data }),

  put: <T>(endpoint: string, data?: any, options: RequestOptions = {}) =>
    request<T>(endpoint, { ...options, method: "PUT", data }),

  patch: <T>(endpoint: string, data?: any, options: RequestOptions = {}) =>
    request<T>(endpoint, { ...options, method: "PATCH", data }),

  delete: <T>(endpoint: string, options: RequestOptions = {}) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
