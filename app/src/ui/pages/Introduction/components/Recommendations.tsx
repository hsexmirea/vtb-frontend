import { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Code,
    Flex,
    Button,
} from '@chakra-ui/react';


const RecommendationItem = ({ title, icon, children, isOpen, onToggle }: any) => {
    return (
        <Box borderWidth="1px" borderRadius="md" mb={4} overflow="hidden">
            <Button
                onClick={onToggle}
                width="100%"
                justifyContent="space-between"
                variant="ghost"
            >
                <Flex align="center">
                    {icon}
                    <Text ml={2}>{title}</Text>
                </Flex>
                <Box>{isOpen ? '▼' : '►'}</Box>
            </Button>
            {isOpen && (
                <Box p={4}>
                    {children}
                </Box>
            )}
        </Box>
    );
};

const Recommendations = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={6}>
            <Heading as="h2" size="lg" mb={4}>
                Optimization Recommendations
            </Heading>

            <RecommendationItem
                title="Add Indexes"
                isOpen={openIndex === 0}
                onToggle={() => toggleItem(0)}
            >
                <Text mb={2}>Creating indexes can significantly improve query performance:</Text>
                <Code display="block" whiteSpace="pre" p={4} bg="gray.50" borderRadius="md" mb={2}>
                    CREATE INDEX idx_users_created_at ON users(created_at);{'\n'}
                    CREATE INDEX idx_orders_user_id ON orders(user_id);
                </Code>
                <Text fontSize="sm" color="gray.600">
                    Estimated performance improvement: ~70%
                </Text>
            </RecommendationItem>

            <RecommendationItem
                title="Avoid SELECT *"
                isOpen={openIndex === 1}
                onToggle={() => toggleItem(1)}
            >
                <Text mb={2}>Instead of selecting all columns, specify only the ones you need:</Text>
                <Code display="block" whiteSpace="pre" p={4} bg="gray.50" borderRadius="md">
                    SELECT u.id, u.name, o.order_date, o.total{'\n'}
                    FROM users u{'\n'}
                    JOIN orders o ON u.id = o.user_id{'\n'}
                    WHERE u.created_at &gt; '2024-01-01';
                </Code>
                <Text fontSize="sm" color="gray.600">
                    Estimated performance improvement: ~15%
                </Text>
            </RecommendationItem>

            <RecommendationItem
                title="Query Structure Optimization"
                isOpen={openIndex === 2}
                onToggle={() => toggleItem(2)}
            >
                <Text mb={2}>Consider using EXISTS instead of JOIN for existence checks:</Text>
                <Code display="block" whiteSpace="pre" p={4} bg="gray.50" borderRadius="md">
                    SELECT *{'\n'}
                    FROM users u{'\n'}
                    WHERE u.created_at &gt; '2024-01-01'{'\n'}
                    AND EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
                </Code>
                <Text fontSize="sm" color="gray.600">
                    May improve performance for certain query patterns
                </Text>
            </RecommendationItem>
        </Box>
    );
};

export default Recommendations;