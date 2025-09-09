import { useMemo } from "react"
import {
    useChatStore,
    useMainMessage,
    useComparisonMessages,
    useConnectionInfo,
    useLastRecommendation,
    useChatActions,
} from "../store/chat"
import { useShallow } from "zustand/react/shallow"

export const useChat = () => {
    // Используем useShallow для выбора нескольких полей
    const { isLoading, error } = useChatStore(
        useShallow((state) => ({
            isLoading: state.isLoading,
            error: state.error,
        }))
    )

    const mainMessage = useMainMessage()
    const comparisonMessages = useComparisonMessages()

    // Используем useShallow для connectionInfo
    const connectionInfo = useConnectionInfo()

    const lastRecommendation = useLastRecommendation()

    // Мемоизируем actions
    const actions = useChatActions()

    return useMemo(
        () => ({
            // Состояние
            mainMessage,
            comparisonMessages,
            connectionInfo,
            lastRecommendation,
            isLoading,
            error,

            ...actions,
        }),
        [
            mainMessage,
            comparisonMessages,
            connectionInfo,
            lastRecommendation,
            isLoading,
            error,
            actions, // actions теперь стабильная ссылка
        ]
    )
}
