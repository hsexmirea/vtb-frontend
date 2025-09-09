import {
    Box,
    Heading,
    SimpleGrid,
    Text,
} from '@chakra-ui/react';
import { Progress } from '@chakra-ui/progress';

const PerformanceMetrics = () => {
    return (
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={6}>
            <Heading as="h2" size="lg" mb={6}>
                Performance Metrics
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                <Box p={4} bg="gray.50" borderRadius="md">
                    <Text fontWeight="bold">Execution Time</Text>
                    <Text fontSize="2xl" fontWeight="bold">248ms</Text>
                    <Text fontSize="sm" color="gray.600" mb={2}>Without optimization</Text>
                    <Progress value={80} colorScheme="red" size="sm" mb={2} />
                    <Text fontSize="sm">Estimated after optimization: ~75ms</Text>
                </Box>

                <Box p={4} bg="gray.50" borderRadius="md">
                    <Text fontWeight="bold">CPU Usage</Text>
                    <Text fontSize="2xl" fontWeight="bold">42%</Text>
                    <Text fontSize="sm" color="gray.600" mb={2}>Peak usage during query</Text>
                    <Progress value={42} colorScheme="orange" size="sm" mb={2} />
                    <Text fontSize="sm">Estimated after optimization: ~15%</Text>
                </Box>

                <Box p={4} bg="gray.50" borderRadius="md">
                    <Text fontWeight="bold">Memory Usage</Text>
                    <Text fontSize="2xl" fontWeight="bold">128MB</Text>
                    <Text fontSize="sm" color="gray.600" mb={2}>Working set size</Text>
                    <Progress value={60} colorScheme="blue" size="sm" mb={2} />
                    <Text fontSize="sm">Estimated after optimization: ~45MB</Text>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default PerformanceMetrics;