const TOKEN_KEY = 'civicops_token'

export const auth = {
  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(TOKEN_KEY))
  },
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export default auth
