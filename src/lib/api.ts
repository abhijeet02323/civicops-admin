const API_BASE = import.meta.env.VITE_CIVICOPS_API_BASE || 'https://civic-ops.onrender.com'
const TOKEN_KEY = 'civicops-access-token'

/**
 * Shared client for the admin API. It preserves the current public/demo behaviour
 * while automatically securing requests after an admin session is stored.
 */
export const getAccessToken = () => localStorage.getItem(TOKEN_KEY)
export const setAccessToken = (token: string) => localStorage.setItem(TOKEN_KEY, token)
export const clearAccessToken = () => localStorage.removeItem(TOKEN_KEY)

export const apiFetch = (path: string, init: RequestInit = {}) => {
  const token = getAccessToken()
  const headers = new Headers(init.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return fetch(`${API_BASE}${path}`, { ...init, headers })
}

export type LoginResponse = { access_token: string; admin: { id: number; username: string; full_name: string; role: string; department_id?: number; department_name?: string } }

export const loginAdmin = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await apiFetch('/admin/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ username, password }) })
  if (!response.ok) throw new Error('Login failed. Check the username and password.')
  const json = await response.json() as { data?: LoginResponse }
  if (!json.data?.access_token) throw new Error('Login response did not include an access token.')
  setAccessToken(json.data.access_token)
  return json.data
}
