export interface User {
    username: string
    password: string
}

export interface AuthResponse {
    access_token: string
    user: User
}

export type LoginData = Pick<User, "username" | "password">

export type RegisterData = LoginData
