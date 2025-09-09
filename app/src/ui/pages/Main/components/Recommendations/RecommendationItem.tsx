import {
    Box,
    Text,
    Flex,
    Button,
    Collapse,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import { FiChevronDown, FiZap, FiClock, FiBarChart2 } from 'react-icons/fi';

interface RecommendationItemProps {
    title: string;
    icon: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    impact: 'high' | 'medium' | 'low';
    estimatedImprovement: string;
    complexity: 'easy' | 'medium' | 'hard';
}

const RecommendationItem = ({
    title,
    icon,
    children,
    isOpen,
    onToggle,
    impact,
    estimatedImprovement,
    complexity
}: RecommendationItemProps) => {
    const bgColor = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const hoverBg = useColorModeValue('gray.50', 'gray.600');

    const impactColors = {
        high: 'red',
        medium: 'orange',
        low: 'green'
    };

    const complexityColors = {
        easy: 'green',
        medium: 'yellow',
        hard: 'red'
    };

    return (
        <Box
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
            overflow="hidden"
            bg={bgColor}
        >
            <Button
                onClick={onToggle}
                width="100%"
                justifyContent="space-between"
                variant="ghost"
                py={4}
                px={4}
                _hover={{ bg: hoverBg }}
            >
                <Flex align="center" gap={3}>
                    <Text fontSize="xl">{icon}</Text>
                    <Box textAlign="left">
                        <Text fontWeight="semibold">{title}</Text>
                        <Flex gap={2} mt={1}>
                            <Badge colorScheme={impactColors[impact]} size="sm">
                                <FiZap style={{ display: 'inline', marginRight: '2px' }} />
                                {impact === 'high' ? 'Высокая' : impact === 'medium' ? 'Средняя' : 'Низкая'}
                            </Badge>
                            <Badge colorScheme={complexityColors[complexity]} size="sm">
                                <FiClock style={{ display: 'inline', marginRight: '2px' }} />
                                {complexity === 'easy' ? 'Легко' : complexity === 'medium' ? 'Средне' : 'Сложно'}
                            </Badge>
                        </Flex>
                    </Box>
                </Flex>
                <Box
                    transform={isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'}
                    transition="transform 0.2s"
                >
                    <FiChevronDown />
                </Box>
            </Button>

            <Collapse in={isOpen} animateOpacity>
                <Box p={4}>
                    {children}
                    <Text fontSize="sm" color="blue.600" mt={3} fontWeight="medium">
                        <FiBarChart2 style={{ display: 'inline', marginRight: '4px' }} />
                        {estimatedImprovement}
                    </Text>
                </Box>
            </Collapse>
        </Box>
    );
};

export default RecommendationItem;