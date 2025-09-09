import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type Message, Direction } from "../types/chat"
import * as chatApi from "../api/chat"
import type {
    RecommendationResponse,
    ConnectionCheckResponse,
} from "../api/chat"
import { useShallow } from "zustand/shallow"

interface ChatState {
    mainMessage: Message | null
    comparisonMessages: Message[]
    isLoading: boolean
    error: string | null
    connectionUrl: string | null
    schema: string | null
    isConnectionValid: boolean | null
    lastRecommendation: RecommendationResponse | null

    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    setMainMessage: (text: string) => void
    updateMainMessage: (text: string) => void
    addComparisonMessage: (text: string) => void
    removeComparisonMessage: (messageId: string) => void
    clearAllMessages: () => void

    setConnectionUrl: (url: string) => void
    setSchema: (schema: string) => void
    getRecommendation: (
        query: string,
        isFirstQuery: boolean,
        token: string
    ) => Promise<RecommendationResponse>
}

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            mainMessage: null,
            comparisonMessages: [],
            isLoading: false,
            error: null,
            connectionUrl: null,
            schema: null,
            isConnectionValid: null,
            lastRecommendation: null,

            setLoading: (loading) => set({ isLoading: loading }),
            setError: (error) => set({ error }),

            setMainMessage: (text: string) =>
                set({
                    mainMessage: {
                        id: `main-${Date.now()}`,
                        text,
                        direction: Direction.OUTGOING,
                        createdAt: new Date().toISOString(),
                        chatId: "single-chat",
                    },
                }),

            updateMainMessage: (text: string) =>
                set((state) => ({
                    mainMessage: state.mainMessage
                        ? {
                              ...state.mainMessage,
                              text,
                              createdAt: new Date().toISOString(),
                          }
                        : {
                              id: `main-${Date.now()}`,
                              text,
                              direction: Direction.OUTGOING,
                              createdAt: new Date().toISOString(),
                              chatId: "single-chat",
                          },
                })),

            addComparisonMessage: (text: string) =>
                set((state) => ({
                    comparisonMessages: [
                        ...state.comparisonMessages,
                        {
                            id: `comp-${Date.now()}`,
                            text,
                            direction: Direction.OUTGOING,
                            createdAt: new Date().toISOString(),
                            chatId: "single-chat",
                        },
                    ],
                })),

            removeComparisonMessage: (messageId: string) =>
                set((state) => ({
                    comparisonMessages: state.comparisonMessages.filter(
                        (msg) => msg.id !== messageId
                    ),
                })),

            clearAllMessages: () =>
                set({
                    mainMessage: null,
                    comparisonMessages: [],
                }),

            setConnectionUrl: (url: string) => set({ connectionUrl: url }),
            setSchema: (schema: string) => set({ schema }),

            getRecommendation: async (
                query: string,
                isFirstQuery: boolean,
                token: string
            ) => {
                const { setLoading, setError, connectionUrl, schema } = get()
                setLoading(true)
                setError(null)

                try {
                    if (!connectionUrl) {
                        throw new Error("URL подключения не указан")
                    }

                    const response = await chatApi.getRecommendation(
                        {
                            query_text: query,
                            is_first_query: isFirstQuery,
                            connection_url: connectionUrl,
                        },
                        token
                    )

                    set({ lastRecommendation: response })
                    return response
                } catch (error: any) {
                    setError(error.message || "Ошибка получения рекомендации")
                    throw error
                } finally {
                    setLoading(false)
                }
            },
        }),
        {
            name: "chat-storage",
            partialize: (state) => ({
                mainMessage: state.mainMessage,
                comparisonMessages: state.comparisonMessages,
                connectionUrl: state.connectionUrl,
                schema: state.schema,
                isConnectionValid: state.isConnectionValid,
                lastRecommendation: state.lastRecommendation,
            }),
        }
    )
)

// Селекторы
export const useMainMessage = () => useChatStore((state) => state.mainMessage)
export const useComparisonMessages = () =>
    useChatStore((state) => state.comparisonMessages)
export const useConnectionInfo = () => {
    return useChatStore(
        useShallow((state) => ({
            connectionUrl: state.connectionUrl,
            schema: state.schema,
            isConnectionValid: state.isConnectionValid,
        }))
    )
}
export const useLastRecommendation = () =>
    useChatStore((state) => state.lastRecommendation)

// store/chat.ts
export const useChatActions = () => {
    return useChatStore(
        useShallow((state) => ({
            setMainMessage: state.setMainMessage,
            updateMainMessage: state.updateMainMessage,
            addComparisonMessage: state.addComparisonMessage,
            removeComparisonMessage: state.removeComparisonMessage,
            clearAllMessages: state.clearAllMessages,
            setConnectionUrl: state.setConnectionUrl,
            setSchema: state.setSchema,
            getRecommendation: state.getRecommendation,
            setError: state.setError,
        }))
    )
}
export const useChatInfo = () =>
    useChatStore((state) => ({
        hasMainMessage: !!state.mainMessage,
        comparisonCount: state.comparisonMessages.length,
        isLoading: state.isLoading,
        error: state.error,
    }))
