import { useState } from 'react';
import {
    Box,
    Heading,
    Textarea,
    Flex,
    Badge,
    Button,
    Text,
} from '@chakra-ui/react';

const QueryAnalyzer = () => {
    const [query, setQuery] = useState(`SELECT * FROM users u  
JOIN orders o ON u.id = o.user_id  
WHERE u.created_at > '2024-01-01';`);
    const [estimatedCost,] = useState('2.4d');


    return (
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={6}>
            <Heading as="h2" size="lg" mb={4}>
                Query Analyzer
            </Heading>
            <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fontFamily="monospace"
                minH="150px"
                mb={4}
                placeholder="Enter your PostgreSQL query here..."
            />
            <Button colorScheme="blue" mb={6}>
                Analyze Query
            </Button>

            <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                <Box p={4} bg="gray.50" borderRadius="md" flex={1}>
                    <Text fontWeight="bold" mb={2}>Estimated Cost</Text>
                    <Badge colorScheme="red" fontSize="lg" p={1} mb={2}>
                        High ({estimatedCost})
                    </Badge>
                    <Text fontSize="sm" color="gray.600">
                        Potential performance issue detected
                    </Text>
                </Box>

                <Box p={4} bg="blue.50" borderRadius="md" flex={1}>
                    <Heading as="h3" size="md" mb={2}>
                        Recommendation
                    </Heading>
                    <Badge colorScheme="green" fontSize="md" p={1} mb={2}>
                        Add Index
                    </Badge>
                    <Box mt={2}>
                        <Box as="pre" fontFamily="monospace" fontSize="sm" bg="white" p={2} borderRadius="md">
                            CREATE INDEX idx_users_created_at ON users(created_at);
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default QueryAnalyzer;