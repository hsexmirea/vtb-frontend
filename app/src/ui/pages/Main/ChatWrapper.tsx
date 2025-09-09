import { useCallback, useMemo, useState } from 'react';
import { Chat } from './Chat';
import { useChat } from '../../../app/hooks/useChat';
import { useUser } from '../../../app/hooks/useUser';
import { Direction } from '../../../app/types/chat';

export const ChatWrapper = () => {
    const { token } = useUser();
    const {
        mainMessage,
        comparisonMessages,
        connectionInfo,
        isLoading,
        error,
        setMainMessage,
        addComparisonMessage,
        clearAllMessages,
        getRecommendation,
        setConnectionUrl,
    } = useChat();

    const [aiResponses, setAiResponses] = useState<Array<{ query: string; response: any }>>([]);

    const handleGetRecommendation = useCallback(async (query: string, isFirstQuery: boolean = false) => {
        const response = await getRecommendation(query, isFirstQuery, token!);
        setAiResponses(prev => [...prev, { query, response }]);
        return response;
    }, [getRecommendation, token]);

    const handleSetMainMessage = async (text: string) => {
        setMainMessage(text);
        console.log(token)
        if (token) {
            try {
                const response = await getRecommendation(text, true, token);
                setAiResponses(prev => [...prev, {
                    query: text,
                    response
                }]);
            } catch (error) {
                console.error('Failed to get recommendation for main message:', error);
            }
        }
    }

    const allMessages = useMemo(() => {
        return [
            ...(mainMessage ? [{ ...mainMessage, isMain: true }] : []),
            ...comparisonMessages.map(msg => ({ ...msg, isMain: false })),
            ...aiResponses.flatMap(({ query, response }, index) => [
                {
                    id: `ai-query-${index}`,
                    text: query,
                    direction: Direction.OUTGOING,
                    createdAt: new Date().toISOString(),
                    chatId: "ai-chat",
                    isMain: false
                },
                {
                    id: `ai-response-${index}`,
                    text: `РЕКОМЕНДАЦИЯ:\n\n${response.recommendation}\n\n---\nМетрики:\n• Время: ${response.time}ms\n• Память: ${response.memory}MB\n• I/O операций: ${response.io}`,
                    direction: Direction.INCOMMING,
                    createdAt: new Date().toISOString(),
                    chatId: "ai-chat",
                    isMain: false
                }
            ])
        ].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }, [mainMessage, comparisonMessages, aiResponses]);

    const handleClearAll = useCallback(() => {
        clearAllMessages();
        setAiResponses([]);
    }, [clearAllMessages]);

    return (
        <Chat
            onGetRecommendation={handleGetRecommendation}
            onSendMessage={addComparisonMessage}
            onSetMainMessage={handleSetMainMessage}
            onClearAll={handleClearAll}
            setConnectionUrl={setConnectionUrl}
            messages={allMessages}
            isLoading={isLoading}
            error={error}
            connectionUrl={connectionInfo.connectionUrl}
        />
    );
};