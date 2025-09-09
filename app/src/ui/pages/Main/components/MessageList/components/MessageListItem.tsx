import { useState } from 'react';
import {
    Box,
    Text,
    Flex,
    IconButton,
    useColorModeValue,
    Tooltip,
    Badge,
    Collapse,
    Button,
    Textarea,
} from '@chakra-ui/react';
import { FiEdit, FiTrash, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { type Message } from '../../../../../../app/types/chat';
import { type ValidationResult } from '../../../helpers/validateSql';

interface MessageListItemProps {
    message: Message;
    isUser: boolean;
    validation?: ValidationResult;
    isLikelySql: boolean;
    isComparison?: boolean;
    onEdit?: (text: string) => void;
    onDelete?: () => void;
    isEditable?: boolean;
}

export const MessageListItem = ({
    message,
    isUser,
    validation,
    isLikelySql,
    isComparison = false,
    onEdit,
    onDelete,
    isEditable = false,
}: MessageListItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(message.text);
    const [isExpanded, setIsExpanded] = useState(false);

    const bgColor = useColorModeValue(
        isComparison ? 'green.50' : (isUser ? 'blue.50' : 'gray.100'),
        isComparison ? 'green.900' : (isUser ? 'blue.900' : 'gray.700')
    );

    const borderColor = useColorModeValue(
        isComparison ? 'green.200' : (isUser ? 'blue.200' : 'gray.300'),
        isComparison ? 'green.600' : (isUser ? 'blue.600' : 'gray.600')
    );

    const handleSaveEdit = () => {
        if (onEdit && editedText.trim() !== message.text) {
            onEdit(editedText.trim());
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedText(message.text);
        setIsEditing(false);
    };

    const shouldShowExpand = message.text.length > 500;

    return (
        <Box
            p={4}
            borderRadius="lg"
            bg={bgColor}
            borderWidth="1px"
            borderColor={borderColor}
            width="100%"
            maxWidth="100%"
            position="relative"
        >
            {/* Заголовок для comparison сообщений */}
            {isComparison && (
                <Badge colorScheme="green" mb={2} fontSize="xs">
                    🚀 Рекомендация системы
                </Badge>
            )}

            {isEditing ? (
                <Box>
                    <Textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        fontFamily="monospace"
                        fontSize="sm"
                        rows={6}
                        mb={2}
                    />
                    <Flex gap={2}>
                        <Button size="sm" colorScheme="blue" onClick={handleSaveEdit}>
                            Сохранить
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                            Отмена
                        </Button>
                    </Flex>
                </Box>
            ) : (
                <Box>
                    {shouldShowExpand ? (
                        <>
                            <Collapse startingHeight={120} in={isExpanded}>
                                <Text
                                    fontFamily={isLikelySql ? 'monospace' : 'inherit'}
                                    fontSize="sm"
                                    whiteSpace="pre-wrap"
                                    wordBreak="break-word"
                                >
                                    {message.text}
                                </Text>
                            </Collapse>
                            <Button
                                size="xs"
                                variant="ghost"
                                leftIcon={isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                                onClick={() => setIsExpanded(!isExpanded)}
                                mt={2}
                            >
                                {isExpanded ? 'Свернуть' : 'Развернуть'}
                            </Button>
                        </>
                    ) : (
                        <Text
                            fontFamily={isLikelySql ? 'monospace' : 'inherit'}
                            fontSize="sm"
                            whiteSpace="pre-wrap"
                            wordBreak="break-word"
                        >
                            {message.text}
                        </Text>
                    )}
                </Box>
            )}

            {/* Кнопки действий */}
            {(onEdit || onDelete) && !isEditing && (
                <Flex gap={1} mt={2} justifyContent="flex-end">
                    {isEditable && onEdit && (
                        <Tooltip label="Редактировать">
                            <IconButton
                                icon={<FiEdit />}
                                aria-label="Редактировать"
                                size="xs"
                                variant="ghost"
                                onClick={() => setIsEditing(true)}
                            />
                        </Tooltip>
                    )}
                    {onDelete && (
                        <Tooltip label="Удалить">
                            <IconButton
                                icon={<FiTrash />}
                                aria-label="Удалить"
                                size="xs"
                                variant="ghost"
                                colorScheme="red"
                                onClick={onDelete}
                            />
                        </Tooltip>
                    )}
                </Flex>
            )}
        </Box>
    );
};