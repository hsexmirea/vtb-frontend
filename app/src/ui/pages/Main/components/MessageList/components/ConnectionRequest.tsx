// components/ConnectionRequest.tsx
import React, { useState } from 'react';
import {
    Box,
    VStack,
    Text,
    Input,
    Button,
    Flex,
    useColorModeValue,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Code,
    Icon,
    Link
} from '@chakra-ui/react';
import { FiDatabase, FiArrowRight } from 'react-icons/fi';

interface ConnectionRequestProps {
    onConnect: (connectionString: string) => void;
    isLoading?: boolean;
}

export const ConnectionRequest = ({ onConnect, isLoading = false }: ConnectionRequestProps) => {
    const [connectionString, setConnectionString] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(true);

    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const accentColor = '#336791';

    const validateConnectionString = (url: string): boolean => {
        // Простая валидация URL
        try {
            const parsed = new URL(url);
            return parsed.protocol === 'postgresql:' || parsed.protocol === 'postgres:';
        } catch {
            return /^postgres(ql)?:\/\/.+/i.test(url);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateConnectionString(connectionString)) {
            onConnect(connectionString);
        } else {
            setIsValidUrl(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConnectionString(e.target.value);
        setIsValidUrl(true);
    };

    const exampleConnectionString = 'postgresql://username:password@localhost:5432/mydatabase';

    return (
        <Flex
            height="100%"
            align="center"
            justify="center"
            p={8}
            bg={useColorModeValue('gray.50', 'gray.900')}
        >
            <Box
                bg={cardBg}
                borderRadius="xl"
                p={8}
                boxShadow="xl"
                borderWidth="1px"
                borderColor={borderColor}
                maxW="500px"
                w="100%"
            >
                <VStack spacing={6} align="center">
                    {/* Заголовок и иконка */}
                    <Box textAlign="center">
                        <Icon as={FiDatabase} w={12} h={12} color={accentColor} mb={4} />
                        <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={2}>
                            Подключение к PostgreSQL
                        </Text>
                        <Text color="gray.600" fontSize="md">
                            Введите connection string для начала работы
                        </Text>
                    </Box>

                    {/* Форма ввода */}
                    <Box w="100%">
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4}>
                                <Box w="100%">
                                    <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                                        Connection String
                                    </Text>
                                    <Input
                                        value={connectionString}
                                        onChange={handleInputChange}
                                        placeholder={exampleConnectionString}
                                        size="lg"
                                        fontFamily="monospace"
                                        fontSize="14px"
                                        borderColor={isValidUrl ? borderColor : 'red.300'}
                                        _focus={{
                                            borderColor: isValidUrl ? accentColor : 'red.500',
                                            boxShadow: isValidUrl ? `0 0 0 1px ${accentColor}` : '0 0 0 1px red.500'
                                        }}
                                        isDisabled={isLoading}
                                    />
                                    {!isValidUrl && (
                                        <Text fontSize="sm" color="red.500" mt={2}>
                                            Введите корректный PostgreSQL connection string
                                        </Text>
                                    )}
                                </Box>

                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    size="lg"
                                    w="100%"
                                    isLoading={isLoading}
                                    loadingText="Подключение..."
                                    rightIcon={<FiArrowRight />}
                                    isDisabled={!connectionString.trim()}
                                >
                                    Подключиться
                                </Button>
                            </VStack>
                        </form>
                    </Box>

                    {/* Подсказки и пример */}
                    <Box w="100%">
                        <Alert status="info" borderRadius="md" fontSize="sm">
                            <AlertIcon />
                            <Box>
                                <AlertTitle>Формат connection string:</AlertTitle>
                                <AlertDescription>
                                    <Code fontSize="xs" bg="transparent" color="inherit">
                                        postgresql://username:password@host:port/database
                                    </Code>
                                </AlertDescription>
                            </Box>
                        </Alert>

                        <Text fontSize="sm" color="gray.600" mt={4} textAlign="center">
                            Нет базы данных?{' '}
                            <Link
                                href="https://www.postgresql.org/docs/current/tutorial-createdb.html"
                                color={accentColor}
                                isExternal
                                textDecoration="underline"
                            >
                                Создайте новую базу данных
                            </Link>
                        </Text>
                    </Box>
                </VStack>
            </Box>
        </Flex>
    );
};