import { useState } from 'react';
import {
    Box,
    Textarea,
    Button,
    Text,
    Flex,
    IconButton,
    useColorModeValue,
    Tooltip,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { FiSend, FiDatabase, FiStar, FiZap } from 'react-icons/fi';

interface InputAreaProps {
    onSendMessage: (sql: string) => void;
    onSetMainMessage: (sql: string) => void;
    onGetRecommendation: (query: string) => Promise<void>;
    isConnected: boolean;
}

export const InputArea = ({
    onSendMessage,
    onSetMainMessage,
    onGetRecommendation,
    isConnected,
}: InputAreaProps) => {
    const [sql, setSql] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const hoverBorder = useColorModeValue('blue.300', 'blue.500');

    const handleSendMessage = () => {
        if (sql.trim()) {
            onSendMessage(sql.trim());
            setSql('');
        }
    };

    const handleSetMainMessage = () => {
        if (sql.trim()) {
            onSetMainMessage(sql.trim());
            setSql('');
        }
    };

    const handleGetRecommendation = async () => {
        if (sql.trim()) {
            setIsLoading(true);
            try {
                await onGetRecommendation(sql.trim());
            } catch (error) {
                console.error('Failed to get recommendation:', error);
            } finally {
                setIsLoading(false);
                setSql('');
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleGetRecommendation()
        }
    };

    const exampleQueries = [
        `SELECT  pr.status  , pr.requested_by , ro.user_id  , ro.car_engine_id
FROM purchase_requests pr
CROSS JOIN repair_orders ro;`,
        `SELECT
  u.id,
  u.username,
  (SELECT SUM(o.total_cost)
   FROM order_history o
   WHERE o.user_id = u.id) AS total_spent
FROM users u
LEFT JOIN order_history oh ON oh.user_id = u.id
WHERE u.username LIKE '%john%'       
  AND oh.completed_at > now() - interval '1 year'
ORDER BY total_spent DESC
`,
        `SELECT car_engines.engine_name, car_generations.generation_name FROM car_engines FULL OUTER JOIN car_generations ON car_engines.generation_id = car_generations.id WHERE car_engines.engine_type ILIKE '%hybrid%'`
    ];

    return (
        <Box p={4} borderTopWidth="1px" borderColor={borderColor}>
            {!isConnected && (
                <Alert status="warning" borderRadius="md" mb={3} size="sm">
                    <AlertIcon />
                    <Text fontSize="sm">Подключитесь к базе данных чтобы использовать все функции</Text>
                </Alert>
            )}

            <Flex gap={2} mb={3} overflowX="auto" py={2}>
                {exampleQueries.map((query, index) => (
                    <Tooltip key={index} label="Нажмите чтобы вставить" hasArrow>
                        <Button
                            size="xs"
                            variant="outline"
                            leftIcon={<FiDatabase />}
                            onClick={() => setSql(query)}
                            whiteSpace="nowrap"
                            isDisabled={!isConnected}
                        >
                            Пример {index + 1}
                        </Button>
                    </Tooltip>
                ))}
            </Flex>

            <Flex gap={3}>
                <Textarea
                    value={sql}
                    onChange={(e) => setSql(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={
                        isConnected ? "Введите SQL запрос..." : "Сначала подключитесь к базе данных..."
                    }
                    fontFamily="monospace"
                    fontSize="sm"
                    rows={3}
                    resize="vertical"
                    borderColor={borderColor}
                    _hover={{ borderColor: hoverBorder }}
                    _focus={{
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 1px blue.400',
                    }}
                    isDisabled={!isConnected}
                />
                <Flex direction="column" gap={2} alignSelf="flex-end">
                    <IconButton
                        icon={<FiStar />}
                        aria-label="Установить как главное"
                        onClick={handleGetRecommendation}
                        colorScheme="yellow"
                        isDisabled={!sql.trim() || !isConnected}
                    />
                    <IconButton
                        icon={<FiZap />}
                        aria-label="Получить рекомендацию"
                        onClick={handleGetRecommendation}
                        colorScheme="green"
                        isLoading={isLoading}
                        isDisabled={!sql.trim() || !isConnected}
                    />
                </Flex>
            </Flex>

            <Text fontSize="xs" color="gray.500" mt={2} textAlign="center">
                Enter для отправки, Shift+Enter для новой строки
            </Text>
        </Box>
    );
};