import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from '@chakra-ui/react';
import { type UseFormRegister, type FieldError } from 'react-hook-form';

interface AuthFormFieldProps {
    label: string;
    type: string;
    placeholder: string;
    isDisabled?: boolean;
    error?: FieldError;
    register: UseFormRegister<any>;
    name: string;
    validation: any;
}

export const AuthFormField = ({
    label,
    type,
    placeholder,
    isDisabled,
    error,
    register,
    name,
    validation
}: AuthFormFieldProps) => {
    return (
        <FormControl isInvalid={!!error} isRequired>
            <FormLabel color="gray.700" fontWeight="medium">
                {label}
            </FormLabel>
            <Input
                type={type}
                placeholder={placeholder}
                borderColor="gray.300"
                _hover={{ borderColor: "#336791" }}
                _focus={{
                    borderColor: "#336791",
                    boxShadow: "0 0 0 1px #336791"
                }}
                size="lg"
                isDisabled={isDisabled}
                {...register(name, validation)}
            />
            <FormErrorMessage>
                {error?.message}
            </FormErrorMessage>
        </FormControl>
    );
};