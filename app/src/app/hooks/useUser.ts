import { useCallback } from "react"
import {
    selectUser,
    selectUserToken,
    selectIsAuthenticated,
    selectUserLoading,
    selectUserActions,
    selectUserError,
} from "../store/user"
import { type LoginData, type RegisterData } from "../types/user"

export const useUser = () => {
    const user = selectUser()
    const token = selectUserToken()
    const isAuthenticated = selectIsAuthenticated()
    const isLoading = selectUserLoading()
    const error = selectUserError()
    const actions = selectUserActions()

    const login = useCallback(
        async (loginData: LoginData) => {
            return actions.login(loginData)
        },
        [actions]
    )

    const register = useCallback(
        async (userData: RegisterData) => {
            return actions.register(userData)
        },
        [actions]
    )

    const logout = useCallback(async () => {
        return actions.logout()
    }, [actions])

    const clearError = useCallback(() => {
        actions.setError(null)
    }, [actions])

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        error,

        login,
        register,
        logout,
        clearError,
        clearAuth: actions.clearAuth,
    }
}
