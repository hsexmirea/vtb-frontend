import { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    useColorModeValue,
    HStack,
    Text,
    Button,
    Tooltip,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Badge,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { FaSync, FaDatabase } from 'react-icons/fa';
import { MessageList } from './components/MessageList';
import { InputArea } from './components/InputArea';
import { type Message } from '../../../app/types/chat';

interface ChatProps {
    onGetRecommendation: (query: string, isFirstQuery?: boolean) => Promise<any>;
    onSendMessage: (text: string) => void;
    onSetMainMessage: (text: string) => void;
    onClearAll: () => void;
    setConnectionUrl: (url: string) => void;
    messages: Message[];
    isLoading?: boolean;
    error: string | null;
    connectionUrl?: string | null;
}

export const Chat = ({
    onGetRecommendation,
    onSendMessage,
    onSetMainMessage,
    onClearAll,
    setConnectionUrl,
    messages,
    isLoading = false,
    error,
    connectionUrl = null
}: ChatProps) => {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tempConnectionUrl, setTempConnectionUrl] = useState(connectionUrl || '');

    const sidebarBg = useColorModeValue('white', 'gray.800');
    const sidebarBorderColor = useColorModeValue('gray.200', 'gray.600');
    const headerBg = useColorModeValue('white', 'gray.800');
    const headerBorderColor = useColorModeValue('gray.200', 'gray.600');

    const handleSaveConnection = async () => {
        if (tempConnectionUrl.trim()) {
            try {
                setConnectionUrl(tempConnectionUrl.trim());
                onClose();
            } catch (error) {
                console.error('Connection error:', error);
            }
        }
    };

    if (isLoading && messages.length === 0) {
        return (
            <Flex height="100vh" align="center" justify="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <Flex height="100vh" bg={bgColor}>
            {/* Модальное окно для подключения */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Подключение к PostgreSQL</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Connection URL</FormLabel>
                            <Input
                                placeholder="postgresql://username:password@localhost:5432/database"
                                value={tempConnectionUrl}
                                onChange={(e) => setTempConnectionUrl(e.target.value)}
                                fontFamily="monospace"
                                fontSize="sm"
                            />
                        </FormControl>

                        {connectionUrl && (
                            <Alert status="info" borderRadius="md" fontSize="sm" mb={3}>
                                <AlertIcon />
                                <Box>
                                    <Text fontWeight="bold">Текущее подключение:</Text>
                                    <Text fontSize="xs" isTruncated>
                                        {connectionUrl}
                                    </Text>
                                </Box>
                            </Alert>
                        )}

                        <Alert status="info" borderRadius="md" fontSize="sm">
                            <AlertIcon />
                            <Box>
                                <Text fontWeight="bold">Формат Connection URL:</Text>
                                <Text fontSize="xs">postgresql://username:password@host:port/database</Text>
                            </Box>
                        </Alert>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Отмена
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={handleSaveConnection}
                            isDisabled={!tempConnectionUrl.trim()}
                        >
                            {connectionUrl ? 'Обновить подключение' : 'Подключиться'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box
                width="60px"
                bg={sidebarBg}
                borderRight="1px solid"
                borderColor={sidebarBorderColor}
                p={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={4}
                pt={4}
                overflowX='hidden'
            >
                <Tooltip label="Обновить" placement="right" hasArrow>
                    <IconButton
                        icon={<FaSync />}
                        aria-label="Обновить"
                        size="md"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => window.location.reload()}
                    />
                </Tooltip>

                <Tooltip label="Подключение к БД" placement="right" hasArrow>
                    <IconButton
                        icon={<FaDatabase />}
                        aria-label="Подключение к БД"
                        size="md"
                        variant="ghost"
                        colorScheme={connectionUrl ? "green" : "gray"}
                        onClick={onOpen}
                    />
                </Tooltip>
            </Box>

            <Flex direction="column" flex={1}>
                <Box
                    bg={headerBg}
                    borderBottom="1px solid"
                    borderColor={headerBorderColor}
                    p={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <HStack spacing={4}>
                        <Text fontSize="lg" fontWeight="bold">
                            SQL Оптимизатор
                        </Text>
                        <Badge
                            colorScheme={connectionUrl ? "green" : "gray"}
                            fontSize="sm"
                        >
                            {connectionUrl ? 'Подключено' : 'Не подключено'}
                        </Badge>
                        {connectionUrl && (
                            <Tooltip label={connectionUrl} hasArrow>
                                <Badge
                                    colorScheme="blue"
                                    fontSize="xs"
                                    maxW="200px"
                                    isTruncated
                                >
                                    {connectionUrl.split('@').pop()}
                                </Badge>
                            </Tooltip>
                        )}
                    </HStack>

                    <Button
                        size="sm"
                        variant="outline"
                        colorScheme="blue"
                        onClick={onClearAll}
                    >
                        Очистить всё
                    </Button>
                </Box>

                {error && (
                    <Alert status="error" borderRadius="md" mx={4} mt={4}>
                        <AlertIcon />
                        <AlertTitle>Ошибка!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Box flex={1} overflow="auto" p={4}>
                    {messages.length === 0 ? (
                        <Flex
                            height="100%"
                            align="center"
                            justify="center"
                            direction="column"
                            gap={4}
                        >
                            <Box
                                p={6}
                                bg={useColorModeValue('white', 'gray.700')}
                                borderRadius="lg"
                                boxShadow="lg"
                                maxW="400px"
                                textAlign="center"
                            >
                                <FaDatabase size={48} color="#3182CE" />
                                <Text fontSize="xl" fontWeight="bold" mt={4} mb={2}>
                                    {connectionUrl ? 'Добро пожаловать!' : 'Подключитесь к PostgreSQL'}
                                </Text>
                                <Text color="gray.600" mb={4}>
                                    {connectionUrl
                                        ? 'Начните отправлять SQL запросы для оптимизации'
                                        : 'Для начала работы подключитесь к вашей PostgreSQL базе данных'
                                    }
                                </Text>
                                <Button
                                    colorScheme="blue"
                                    leftIcon={<FaDatabase />}
                                    onClick={onOpen}
                                    size="lg"
                                >
                                    {connectionUrl ? 'Изменить подключение' : 'Подключиться к PostgreSQL'}
                                </Button>
                                <Text fontSize="sm" color="gray.500" mt={3}>
                                    Мы запомним ваш connection URL для будущих сессий
                                </Text>
                            </Box>
                        </Flex>
                    ) : (
                        <MessageList messages={messages} />
                    )}
                </Box>

                <InputArea
                    onSendMessage={onSendMessage}
                    onSetMainMessage={onSetMainMessage}
                    onGetRecommendation={onGetRecommendation}
                    isConnected={!!connectionUrl}
                />
            </Flex>
        </Flex>
    );
};