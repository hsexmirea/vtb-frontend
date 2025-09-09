// components/AuthModal.tsx
import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    error?: string | null;
    children: React.ReactNode;
}

export const AuthModal = ({ isOpen, onClose, title, error, children }: AuthModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent
                bg="white"
                borderRadius="lg"
                maxW="400px"
                mx={4}
            >
                <ModalHeader
                    bg="#336791"
                    color="white"
                    textAlign="center"
                    borderTopRadius="lg"
                    py={4}
                >
                    <Text fontSize="xl" fontWeight="bold">
                        {title}
                    </Text>
                </ModalHeader>
                <ModalCloseButton color="white" />

                <ModalBody py={6}>
                    {error && (
                        <Alert status="error" mb={4} borderRadius="md">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};