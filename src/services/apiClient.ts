import { API_BASE_URL } from "../config/api";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number>;
}

let isRefreshing = false;
let refreshQueue: ((token: string | null) => void)[] = [];

function queueRefreshRequest(callback: (token: string | null) => void) {
  refreshQueue.push(callback);
}

function resolveQueue(token: string | null) {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
}

async function performRefresh(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);

    return data.accessToken;
  } catch {
    return null;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const accessToken = localStorage.getItem("accessToken");

  let headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    authorization: accessToken ? `Bearer ${accessToken}` : "",
  };

  let response = await fetch(url.toString(), { headers, ...options });

  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;

      const newToken = await performRefresh();
      isRefreshing = false;
      resolveQueue(newToken);

      if (!newToken) {
        window.dispatchEvent(new Event("auth-expired"));
        throw new Error("Unauthorized");
      }
    }

    const newToken = await new Promise<string | null>((resolve) =>
      queueRefreshRequest(resolve)
    );

    if (!newToken) {
      window.dispatchEvent(new Event("auth-expired"));
      throw new Error("Unauthorized");
    }

    headers = {
      ...headers,
      authorization: `Bearer ${newToken}`,
    };
    response = await fetch(url.toString(), { headers, ...options });
  }
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}