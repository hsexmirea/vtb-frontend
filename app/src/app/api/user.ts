import { vtbQuery } from "../config/axios"
import type { ApiError } from "../types/api"
import type { User } from "../types/user"
import { getToken, removeToken, saveToken } from "../utils/auth"

export const register = async (userData: User): Promise<unknown> => {
    try {
        const response = await vtbQuery.post("/register", userData)
        const { access_token, user } = response.data

        saveToken(access_token)
        return { access_token, user }
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || "Ошибка регистрации",
            status: error.response?.status,
            data: error.response?.data,
        }
        console.error("Register error:", apiError)
        throw apiError
    }
}

export const login = async (authData: User): Promise<unknown> => {
    try {
        const response = await vtbQuery.post("/auth", null, {
            params: authData,
        })
        const { access_token, user } = response.data

        saveToken(access_token)
        return { access_token, user }
    } catch (error: any) {
        const apiError: ApiError = {
            message:
                error.response?.data?.message || "Неверный логин или пароль",
            status: error.response?.status,
            data: error.response?.data,
        }
        console.error("Login error:", apiError)
        throw apiError
    }
}

export const logout = async (): Promise<void> => {
    try {
        const token = getToken()
        if (token) {
            await vtbQuery.post(
                "/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        }

        removeToken()
    } catch (error: any) {
        const apiError: ApiError = {
            message:
                error.response?.data?.message || "Ошибка выхода из системы",
            status: error.response?.status,
            data: error.response?.data,
        }
        console.error("Logout error:", apiError)
        throw apiError
    }
}
