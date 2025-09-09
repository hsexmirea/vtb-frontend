import { useState } from 'react';
import {
    Box,
    Heading,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react';
import RecommendationItem from './RecommendationItem';

export const Recommendations = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    const recommendations = [
        {
            title: "Добавить индексы",
            icon: "📊",
            impact: "high" as const,
            estimatedImprovement: "~70% улучшение",
            complexity: "easy" as const,
            content: (
                <>
                    <Box mb={3} color="gray.600" fontSize="sm">
                        Создание индексов может значительно ускорить выполнение запросов:
                    </Box>
                    <Box
                        as="pre"
                        p={3}
                        bg="gray.50"
                        borderRadius="md"
                        fontSize="xs"
                        fontFamily="monospace"
                        overflowX="auto"
                    >
                        {`CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_orders_user_id ON orders(user_id);`}
                    </Box>
                </>
            )
        },
        {
            title: "Оптимизировать структуру запроса",
            icon: "⚡",
            impact: "medium" as const,
            estimatedImprovement: "~25% улучшение",
            complexity: "medium" as const,
            content: (
                <>
                    <Box mb={3} color="gray.600" fontSize="sm">
                        Используйте только необходимые столбцы вместо SELECT *:
                    </Box>
                    <Box
                        as="pre"
                        p={3}
                        bg="gray.50"
                        borderRadius="md"
                        fontSize="xs"
                        fontFamily="monospace"
                        overflowX="auto"
                    >
                        {`SELECT id, name, email 
FROM users 
WHERE created_at > '2024-01-01';`}
                    </Box>
                </>
            )
        }
    ];

    return (
        <Box bg={bgColor} p={5} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
            <Heading as="h3" size="md" mb={4} color="blue.600">
                💡 Рекомендации по оптимизации
            </Heading>

            <VStack spacing={3} align="stretch">
                {recommendations.map((rec, index) => (
                    <RecommendationItem
                        key={index}
                        title={rec.title}
                        icon={rec.icon}
                        isOpen={openIndex === index}
                        onToggle={() => toggleItem(index)}
                        impact={rec.impact}
                        estimatedImprovement={rec.estimatedImprovement}
                        complexity={rec.complexity}
                    >
                        {rec.content}
                    </RecommendationItem>
                ))}
            </VStack>
        </Box>
    );
};
