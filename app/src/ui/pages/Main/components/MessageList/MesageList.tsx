import {
    VStack,
    Flex,
    Box,
    Text,
    Divider,
} from '@chakra-ui/react';
import { validateSQL } from '../../helpers/validateSql';
import { MessageListItem } from './components/MessageListItem';
import { ValidationAlerts } from './components/ValidationAlert';
import { Direction, type Message } from '../../../../../app/types/chat';

interface MessageListProps {
    messages: Message[];
    onEditMessage?: (id: string, text: string) => void;
    onDeleteMessage?: (id: string) => void;
}

export const MessageList = ({
    messages,
    onEditMessage,
    onDeleteMessage,
}: MessageListProps) => {
    if (messages.length === 0) {
        return (
            <Box p={8} textAlign="center">
                <Text color="gray.500" fontSize="lg">
                    Нет сообщений
                </Text>
                <Text color="gray.400" fontSize="sm" mt={2}>
                    Начните общение с PostgreSQL оптимизатором
                </Text>
            </Box>
        );
    }

    return (
        <VStack spacing={4} align="stretch">
            {messages.map((message, index) => {
                const validation = validateSQL(message.text);

                const isLikelySql = message.text.includes('SELECT') ||
                    message.text.includes('INSERT') ||
                    message.text.includes('UPDATE') ||
                    message.text.includes('DELETE') ||
                    message.text.includes('FROM') ||
                    message.text.includes('WHERE');

                const isEditable = onEditMessage !== undefined &&
                    message.direction === Direction.OUTGOING;

                // Определяем тип сообщения по содержимому
                const isComparisonMessage = message.text.includes('РЕКОМЕНДАЦИЯ:') ||
                    message.text.includes('Оптимизация:') ||
                    message.text.includes('Сравнение:');

                return (
                    <Box key={message.id || index}>
                        {index > 0 && <Divider my={4} />}

                        <Flex direction='column' alignItems='start' justifyContent='center'>
                            {validation && message.direction === Direction.OUTGOING && (
                                <ValidationAlerts
                                    validation={validation}
                                    isLikelySql={isLikelySql}
                                />
                            )}

                            <MessageListItem
                                message={message}
                                isUser={message.direction === Direction.OUTGOING}
                                validation={validation}
                                isLikelySql={isLikelySql}
                                isComparison={isComparisonMessage}
                                onEdit={isEditable ? (text) => onEditMessage(message.id!, text) : undefined}
                                onDelete={onDeleteMessage ? () => onDeleteMessage(message.id!) : undefined}
                                isEditable={isEditable}
                            />
                        </Flex>
                    </Box>
                );
            })}
        </VStack>
    );
};