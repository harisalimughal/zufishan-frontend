// =========================================================
// ZUFISHAN API CLIENT — shared fetch wrapper with JWT & fallback support
// =========================================================

(function () {
  const TOKEN_KEY = 'zf_token';
  const API_BASE = '/api';

  function getToken() {
    try {
      return localStorage.getItem(TOKEN_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  function setToken(token) {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch (e) {
      // storage unavailable
    }
  }

  function clearToken() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      // storage unavailable
    }
  }

  function buildHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async function request(path, options = {}) {
    const url = path.startsWith('http')
      ? path
      : `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;

    const config = {
      ...options,
      headers: buildHeaders(options.headers),
    };

    try {
      const res = await fetch(url, config);
      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        data = text;
      }

      if (!res.ok) {
        return {
          ok: false,
          status: res.status,
          error: (data && data.message) || res.statusText || 'Request failed',
          data,
        };
      }

      return {
        ok: true,
        status: res.status,
        data,
      };
    } catch (err) {
      console.warn('zfApi request failed (offline or network error):', err.message);
      return {
        ok: false,
        status: 0,
        error: err.message || 'Network error',
        data: null,
      };
    }
  }

  function get(path, queryParams = {}) {
    let url = path;
    const entries = Object.entries(queryParams).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ''
    );
    if (entries.length > 0) {
      const search = new URLSearchParams(entries).toString();
      url += (url.includes('?') ? '&' : '?') + search;
    }
    return request(url, { method: 'GET' });
  }

  function post(path, body) {
    return request(path, {
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  function patch(path, body) {
    return request(path, {
      method: 'PATCH',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  function del(path) {
    return request(path, { method: 'DELETE' });
  }

  window.zfApi = {
    request,
    get,
    post,
    patch,
    delete: del,
    getToken,
    setToken,
    clearToken,
  };
})();
