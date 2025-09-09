import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import QueryAnalyzer from './components/QueryAnalyzer';
import Recommendations from './components/Recommendations';
import PerformanceMetrics from './components/PerformanceMetrics';
import Footer from './components/Footer';

export const Introduction = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/main');
    };

    return (
        <Box minH="100vh" bg="gray.50">
            <Header />
            <Box maxW="1200px" mx="auto" p={5}>
                <QueryAnalyzer />
                <Recommendations />
                <PerformanceMetrics />

                {/* Кнопка перехода к основной функциональности */}
                <Flex justify="center" mt={10} mb={10}>
                    <Button
                        colorScheme="blue"
                        size="lg"
                        onClick={handleGetStarted}
                        bg="blue.600"
                        _hover={{ bg: 'blue.700' }}
                    >
                        Get Started with Advanced Features
                    </Button>
                </Flex>
            </Box>
            <Footer />
        </Box>
    );
};