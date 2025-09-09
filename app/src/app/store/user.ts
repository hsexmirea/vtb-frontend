import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
    type User,
    type LoginData,
    type RegisterData,
    type AuthResponse,
} from "../types/user"
import * as userApi from "../api/user"
import { useShallow } from "zustand/shallow"
import { removeToken, saveToken } from "../utils/auth"

interface UserState {
    user: User | null
    token: string | null
    isLoading: boolean
    error: string | null
    isAuthenticated: boolean

    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    setUser: (user: User | null) => void
    setToken: (token: string | null) => void
    clearAuth: () => void

    register: (userData: RegisterData) => Promise<AuthResponse>
    login: (loginData: LoginData) => Promise<AuthResponse>
    logout: () => Promise<void>
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,

            setLoading: (loading) => set({ isLoading: loading }),
            setError: (error) => set({ error }),

            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                }),

            setToken: (token) => {
                if (token) {
                    saveToken(token)
                } else {
                    removeToken()
                }
                set({
                    token,
                    isAuthenticated: !!token,
                })
            },

            clearAuth: () => {
                removeToken()
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                })
            },

            register: async (userData: RegisterData) => {
                const { setLoading, setError, setUser, setToken } = get()
                setLoading(true)
                setError(null)

                try {
                    const response = (await userApi.register(
                        userData
                    )) as AuthResponse
                    setUser(response.user)
                    setToken(response.access_token)
                    return response
                } catch (error: any) {
                    const errorMessage = error.message || "Ошибка регистрации"
                    setError(errorMessage)
                    throw new Error(errorMessage)
                } finally {
                    setLoading(false)
                }
            },

            login: async (loginData: LoginData) => {
                const { setLoading, setError, setUser, setToken } = get()
                setLoading(true)
                setError(null)

                try {
                    const response = (await userApi.login(
                        loginData
                    )) as AuthResponse
                    setUser(response.user)
                    setToken(response.access_token)
                    console.log(response.access_token)

                    return response
                } catch (error: any) {
                    const errorMessage =
                        error.message || "Неверный логин или пароль"
                    setError(errorMessage)
                    throw new Error(errorMessage)
                } finally {
                    setLoading(false)
                }
            },

            logout: async () => {
                const { setLoading, setError, clearAuth } = get()
                setLoading(true)
                setError(null)

                try {
                    await userApi.logout()
                    clearAuth()
                } catch (error: any) {
                    const errorMessage = error.message || "Ошибка выхода"
                    setError(errorMessage)
                    throw new Error(errorMessage)
                } finally {
                    setLoading(false)
                }
            },
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)

export const selectUser = () => useUserStore(useShallow((state) => state.user))
export const selectUserToken = () =>
    useUserStore(useShallow((state) => state.token))
export const selectIsAuthenticated = () =>
    useUserStore(useShallow((state) => state.isAuthenticated))
export const selectUserLoading = () =>
    useUserStore(useShallow((state) => state.isLoading))
export const selectUserError = () =>
    useUserStore(useShallow((state) => state.error))
export const selectUserActions = () =>
    useUserStore(
        useShallow((state) => ({
            register: state.register,
            login: state.login,
            logout: state.logout,
            clearAuth: state.clearAuth,
            setError: state.setError,
        }))
    )
