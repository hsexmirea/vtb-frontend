import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Text,
    Center,
    VStack,
    HStack,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useUser } from '../../../app/hooks/useUser';
import { type LoginData, type RegisterData } from '../../../app/types/user';
import { AuthModal } from './components/AuthModal';
import { AuthFormField } from './components/AuthFormField';
import { AuthButton } from './components/AuthButton';

export const Auth = () => {
    const navigate = useNavigate();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { login, register: registerUser, isLoading, error, clearError } = useUser();

    const loginForm = useForm<LoginData>();
    const registerForm = useForm<RegisterData>();

    const handleLoginSubmit = async (data: LoginData) => {
        try {
            await login(data);
            onClose();
            loginForm.reset();
            navigate('/main');
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
    };

    const handleRegisterSubmit = async (data: RegisterData) => {
        try {
            await registerUser(data);
            onClose();
            registerForm.reset();
            setIsLoginMode(true);
            // Перенаправляем на главную страницу после успешной регистрации
            navigate('/main');
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    const handleOpen = (mode: 'login' | 'register') => {
        setIsLoginMode(mode === 'login');
        onOpen();
        clearError();
    };

    const handleClose = () => {
        onClose();
        loginForm.reset();
        registerForm.reset();
        clearError();
    };

    const switchMode = () => {
        setIsLoginMode(!isLoginMode);
        clearError();
        if (isLoginMode) {
            registerForm.reset();
        } else {
            loginForm.reset();
        }
    };

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return (
        <Center
            minH="100vh"
            bg="gray.50"
            backgroundImage="
                radial-gradient(circle at 15% 50%, rgba(51, 103, 145, 0.7) 0%, transparent 25%),
                radial-gradient(circle at 85% 30%, rgba(44, 95, 128, 0.6) 0%, transparent 25%),
                radial-gradient(circle at 50% 80%, rgba(37, 87, 112, 0.5) 0%, transparent 30%),
                linear-gradient(135deg, 
                    #336791 0%, 
                    #2C5F80 25%, 
                    #255770 50%, 
                    #1E4E60 75%, 
                    #174650 100%
                )
            "
            backgroundSize="100% 100%, 100% 100%, 100% 100%, 100% 100%"
            backgroundBlendMode="overlay, overlay, overlay, normal"
            position="relative"
            overflow="hidden"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                    linear-gradient(45deg, 
                        rgba(255, 255, 255, 0.1) 25%, 
                        transparent 25%, 
                        transparent 50%, 
                        rgba(255, 255, 255, 0.1) 50%, 
                        rgba(255, 255, 255, 0.1) 75%, 
                        transparent 75%, 
                        transparent
                    )`,
                backgroundSize: '50px 50px',
                animation: 'animatedBackground 20s linear infinite',
                pointerEvents: 'none'
            }}
            sx={{
                '@keyframes animatedBackground': {
                    from: { backgroundPosition: '0 0' },
                    to: { backgroundPosition: '1000px 0' }
                }
            }}
        >
            <Box textAlign="center" position="relative" zIndex={1}>
                <Text
                    fontSize="4xl"
                    fontWeight="bold"
                    color="white"
                    mb={8}
                    textShadow="2px 2px 8px rgba(0,0,0,0.5)"
                    fontFamily="monospace"
                    letterSpacing="1px"
                >
                    Аутентификация PostgreSQL
                </Text>

                <VStack spacing={4}>
                    <AuthButton onClick={() => handleOpen('login')}>
                        Войти в PostgreSQL
                    </AuthButton>

                    <HStack>
                        <Text color="white" fontSize="sm" textShadow="1px 1px 2px rgba(0,0,0,0.5)">
                            Нет аккаунта?
                        </Text>
                        <Button
                            variant="link"
                            color="white"
                            fontSize="sm"
                            textDecoration="underline"
                            onClick={() => handleOpen('register')}
                            _hover={{
                                color: 'blue.100',
                                transform: 'translateY(-1px)',
                                transition: 'all 0.2s'
                            }}
                            textShadow="1px 1px 2px rgba(0,0,0,0.5)"
                        >
                            Зарегистрироваться
                        </Button>
                    </HStack>
                </VStack>

                <AuthModal
                    isOpen={isOpen && isLoginMode}
                    onClose={handleClose}
                    title="Вход в PostgreSQL"
                    error={error}
                >
                    <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)}>
                        <VStack spacing={4}>
                            <AuthFormField
                                label="Имя пользователя"
                                type="text"
                                placeholder="Введите имя пользователя"
                                isDisabled={isLoading}
                                error={loginForm.formState.errors.username}
                                register={loginForm.register}
                                name="username"
                                validation={{
                                    required: 'Имя пользователя обязательно',
                                    minLength: {
                                        value: 3,
                                        message: 'Имя пользователя должно содержать минимум 3 символа'
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'Имя пользователя должно содержать не более 20 символов'
                                    }
                                }}
                            />

                            <AuthFormField
                                label="Пароль"
                                type="password"
                                placeholder="Введите пароль"
                                isDisabled={isLoading}
                                error={loginForm.formState.errors.password}
                                register={loginForm.register}
                                name="password"
                                validation={{
                                    required: 'Пароль обязателен',
                                    minLength: {
                                        value: 4,
                                        message: 'Пароль должен содержать минимум 4 символа'
                                    }
                                }}
                            />

                            <AuthButton
                                type="submit"
                                isLoading={isLoading}
                                loadingText="Вход..."
                            >
                                Войти
                            </AuthButton>

                            <HStack justify="center" pt={2}>
                                <Text color="gray.600" fontSize="sm">
                                    Нет аккаунта?
                                </Text>
                                <Button
                                    variant="link"
                                    color="#336791"
                                    fontSize="sm"
                                    onClick={switchMode}
                                >
                                    Зарегистрироваться
                                </Button>
                            </HStack>
                        </VStack>
                    </form>
                </AuthModal>

                <AuthModal
                    isOpen={isOpen && !isLoginMode}
                    onClose={handleClose}
                    title="Регистрация в PostgreSQL"
                    error={error}
                >
                    <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}>
                        <VStack spacing={4}>
                            <AuthFormField
                                label="Имя пользователя"
                                type="text"
                                placeholder="Выберите имя пользователя"
                                isDisabled={isLoading}
                                error={registerForm.formState.errors.username}
                                register={registerForm.register}
                                name="username"
                                validation={{
                                    required: 'Имя пользователя обязательно',
                                    minLength: {
                                        value: 3,
                                        message: 'Имя пользователя должно содержать минимум 3 символа'
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'Имя пользователя должно содержать не более 20 символов'
                                    }
                                }}
                            />

                            <AuthFormField
                                label="Пароль"
                                type="password"
                                placeholder="Создайте пароль"
                                isDisabled={isLoading}
                                error={registerForm.formState.errors.password}
                                register={registerForm.register}
                                name="password"
                                validation={{
                                    required: 'Пароль обязателен',
                                    minLength: {
                                        value: 4,
                                        message: 'Пароль должен содержать минимум 4 символа'
                                    }
                                }}
                            />

                            <AuthButton
                                type="submit"
                                isLoading={isLoading}
                                loadingText="Создание аккаунта..."
                            >
                                Создать аккаунт
                            </AuthButton>

                            <HStack justify="center" pt={2}>
                                <Text color="gray.600" fontSize="sm">
                                    Уже есть аккаунт?
                                </Text>
                                <Button
                                    variant="link"
                                    color="#336791"
                                    fontSize="sm"
                                    onClick={switchMode}
                                >
                                    Войти
                                </Button>
                            </HStack>
                        </VStack>
                    </form>
                </AuthModal>
            </Box>
        </Center>
    );
};