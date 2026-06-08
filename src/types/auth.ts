export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}

export interface AuthUser {
  id?: string
  username?: string
  email?: string
  firstName?: string
  lastName?: string
}
