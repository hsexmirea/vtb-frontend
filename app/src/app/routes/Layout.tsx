import { type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Spinner, Center } from '@chakra-ui/react';
import { useUser } from '../hooks/useUser';

interface ProtectedLayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: ProtectedLayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading, isAuthenticated } = useUser();

    if (isLoading) {
        return (
            <Center minH="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (isAuthenticated && location.pathname === '/auth') {
        navigate('/main', { replace: true });

    }

    if (!isAuthenticated && location.pathname !== '/auth') {
        navigate('/auth', { replace: true });
    }

    return <>{children}</>;
};