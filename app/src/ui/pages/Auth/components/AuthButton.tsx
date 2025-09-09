// components/AuthButton.tsx
import React from 'react';
import { Button } from '@chakra-ui/react';

interface AuthButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    isLoading?: boolean;
    loadingText?: string;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
}

export const AuthButton = ({
    type = 'button',
    onClick,
    isLoading,
    loadingText,
    children,
    variant = 'primary'
}: AuthButtonProps) => {
    const isPrimary = variant === 'primary';

    return (
        <Button
            type={type}
            onClick={onClick}
            w="100%"
            bg={isPrimary ? "#336791" : "gray.300"}
            color={isPrimary ? "white" : "gray.700"}
            size="lg"
            _hover={{
                bg: isPrimary ? "#255770" : "gray.400"
            }}
            _active={{
                bg: isPrimary ? "#174650" : "gray.500"
            }}
            isLoading={isLoading}
            loadingText={loadingText}
        >
            {children}
        </Button>
    );
};