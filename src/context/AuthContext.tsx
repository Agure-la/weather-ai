import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { login as loginApi, logout as logoutApi, register as registerApi } from '../api/authApi'
import type { LoginRequest, RegisterRequest } from '../types/auth'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (request: LoginRequest) => Promise<void>
  register: (request: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('weather-auth') === 'true',
  )

  const login = useCallback(async (request: LoginRequest) => {
    await loginApi(request)
    sessionStorage.setItem('weather-auth', 'true')
    setIsAuthenticated(true)
  }, [])

  const register = useCallback(async (request: RegisterRequest) => {
    await registerApi(request)
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutApi()
    } finally {
      sessionStorage.removeItem('weather-auth')
      setIsAuthenticated(false)
    }
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, login, register, logout }),
    [isAuthenticated, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
