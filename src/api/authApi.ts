import api from './axios'
import type { LoginRequest, RegisterRequest } from '../types/auth'

export const login = async (request: LoginRequest) => {
  const response = await api.post('/auth/login', request)
  return response.data
}

export const register = async (request: RegisterRequest) => {
  const response = await api.post('/auth/register', request)
  return response.data
}

export const logout = async () => {
  const response = await api.post('/auth/logout')
  return response.data
}
