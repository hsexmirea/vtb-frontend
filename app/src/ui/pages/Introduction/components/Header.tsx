import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    useBreakpointValue,
    Image
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box position="relative" minH="500px" overflow="hidden" bg="url(/public/header_introdaction.jpg)" padding="30px">
            <Flex direction={{ base: "column", lg: "row" }} align="end" gap={8} width="100%" justifyContent='center' paddingTop='50px'>
                <Box flex={1} >
                    <Flex direction="column" paddingLeft='50px' align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }} justifySelf='end'>
                        <Heading as="h1" size="2xl" mb={4} color='white'>
                            Smart PostgreSQL <Text color="rgb(49, 130, 206)">Query Optimizer</Text>
                        </Heading>
                        <Text fontSize="xl" mb={8} maxW="600px" color='white'>
                            Proactively monitor, analyze, and optimize your PostgreSQL queries before execution.
                            Prevent critical database failures with AI-powered recommendations and real-time performance insights.
                        </Text>
                        <Flex gap={4} wrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
                            <Button
                                colorScheme="blue"
                                size="lg"
                                variant="solid"
                                bg="blue.700"
                                onClick={() => navigate('/main')}
                                _hover={{ bg: "blue.800" }}
                                color='white'
                            >
                                Start Free Trial
                            </Button>
                            <Button
                                colorScheme="whiteAlpha"
                                size="lg"
                                variant="outline"
                                _hover={{ bg: "whiteAlpha.200" }}
                                color='white'
                            >
                                View Demo
                            </Button>
                        </Flex>
                    </Flex>
                </Box>

                {!isMobile && (
                    <Flex flex={1} borderRadius="lg" overflow="hidden" boxShadow="2xl" display={isMobile ? 'none' : 'block'}
                    >
                        <Image
                            src="/public/vs-code_introduction.jpg"
                            height="200px"
                            style={{ border: "none", borderRadius: "8px" }}
                            title="VS Code Editor"
                            alignSelf='end'
                            marginLeft='100px'
                            justifySelf='start'

                        />
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default Header;