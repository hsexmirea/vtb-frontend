import { Box, Text, Flex, Link, Icon } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <Box bg="gray.800" color="white" py={10} px={5}>
            <Flex direction="column" align="center">
                <Text mb={2}>
                    Made with <Icon as={FaHeart} color="red.500" /> for VTB Hackathon
                </Text>
                <Text fontSize="sm" opacity={0.7}>
                    &copy; {new Date().getFullYear()} PostgreSQL Query Optimizer. All rights reserved.
                </Text>
                <Flex mt={4} gap={4}>
                    <Link href="#" fontSize="sm" opacity={0.7} _hover={{ opacity: 1 }}>
                        Privacy Policy
                    </Link>
                    <Link href="#" fontSize="sm" opacity={0.7} _hover={{ opacity: 1 }}>
                        Terms of Service
                    </Link>
                    <Link href="#" fontSize="sm" opacity={0.7} _hover={{ opacity: 1 }}>
                        Contact
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Footer;