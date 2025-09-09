import {
    VStack,
    Button,
    Text,
    Box,
    useColorModeValue,
    Badge,
    HStack
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import type { Chat } from '../../../../app/types/chat';

interface HistorySidebarProps {
    chats: Chat[];
    currentChatId?: string;
    onSelectChat: (chatId: string) => void;
    onNewChat?: () => void;
}

export const HistorySidebar = ({
    chats,
    currentChatId,
    onSelectChat,
    onNewChat
}: HistorySidebarProps) => {
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const activeBgColor = useColorModeValue('blue.50', 'blue.900');
    const activeBorderColor = useColorModeValue('blue.200', 'blue.600');

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <VStack spacing={3} align="stretch">
            {onNewChat && (
                <Button
                    leftIcon={<FaPlus />}
                    colorScheme="blue"
                    onClick={onNewChat}
                    mb={4}
                >
                    Создать новый чат
                </Button>
            )}

            {chats.length === 0 ? (
                <Box textAlign="center" py={8}>
                    <Text color="gray.500" fontSize="sm">
                        История чатов пуста
                    </Text>
                </Box>
            ) : (
                chats.map((chat) => (
                    <Box
                        key={chat.id}
                        p={3}
                        border="1px solid"
                        borderColor={chat.id === currentChatId ? activeBorderColor : borderColor}
                        borderRadius="md"
                        cursor="pointer"
                        bg={chat.id === currentChatId ? activeBgColor : 'transparent'}
                        _hover={{
                            bg: useColorModeValue('gray.50', 'gray.700')
                        }}
                        onClick={() => onSelectChat(chat.id!)}
                    >
                        <HStack justify="space-between" align="start" mb={2}>
                            <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                                {chat.title || 'Без названия'}
                            </Text>
                            {chat.id === currentChatId && (
                                <Badge colorScheme="blue" fontSize="xx-small">
                                    Текущий
                                </Badge>
                            )}
                        </HStack>

                        <Text fontSize="xs" color="gray.500">
                            {formatDate(chat.createdAt)}
                        </Text>

                        {chat.messageCount !== undefined && (
                            <Text fontSize="xs" color="gray.500" mt={1}>
                                {chat.messageCount} сообщений
                            </Text>
                        )}
                    </Box>
                ))
            )}
        </VStack>
    );
};
