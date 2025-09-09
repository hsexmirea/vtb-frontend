import { vtbQuery } from "../config/axios"
import type { ApiError } from "../types/api"
import { Direction, type Chat, type Message } from "../types/chat"

export interface ConnectionCheckResponse {
    is_valid: boolean
}

export interface RefreshSchemaRequest {
    connection_url: string
}

export interface RecommendationRequest {
    query_text: string
    is_first_query: boolean
    connection_url: string
}

export interface RecommendationResponse {
    recommendation: string
    time: number
    memory: number
}

export const getRecommendation = async (
    request: RecommendationRequest,
    token: string
): Promise<RecommendationResponse> => {
    try {
        const response = await vtbQuery.post(
            "/recommend",
            { ...request, is_first_query: true },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error: any) {
        const apiError: ApiError = {
            message:
                error.response?.data?.message ||
                "Ошибка получения рекомендации",
            status: error.response?.status,
            data: error.response?.data,
        }
        console.error("Get recommendation error:", apiError)
        throw apiError
    }
}
