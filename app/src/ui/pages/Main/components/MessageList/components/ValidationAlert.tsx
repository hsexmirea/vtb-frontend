import {
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Badge
} from '@chakra-ui/react';
import { type ValidationResult } from '../../../helpers/validateSql';

interface ValidationAlertsProps {
    validation: ValidationResult;
    isLikelySql: boolean;
}

export const ValidationAlerts = ({ validation, isLikelySql }: ValidationAlertsProps) => {
    if (!validation) return null;

    return (
        <Box mb={3}>
            {/* Ошибки */}
            {!validation.isValid && validation.errors.length > 0 && (
                <Alert status="error" borderRadius="md" mb={2} fontSize="sm">
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Ошибка валидации</AlertTitle>
                        <AlertDescription>
                            {validation.errors.join(', ')}
                        </AlertDescription>
                    </Box>
                </Alert>
            )}

            {/* Предупреждения */}
            {validation.warnings.length > 0 && (
                <Alert status="warning" borderRadius="md" mb={2} fontSize="sm">
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Предупреждения</AlertTitle>
                        <AlertDescription>
                            {validation.warnings.join(', ')}
                        </AlertDescription>
                    </Box>
                </Alert>
            )}

            {/* Успешная валидация */}
            {validation.isValid && isLikelySql && (
                <Badge
                    colorScheme="green"
                    fontSize="xs"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    ✓ Валидный SQL
                </Badge>
            )}
        </Box>
    );
};