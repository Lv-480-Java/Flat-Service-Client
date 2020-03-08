export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface ServerResponse {
  idToken: string
  expiresIn: string
}
