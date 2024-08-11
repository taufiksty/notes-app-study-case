import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  ButtonProps,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface ButtonDialogProps {
  title: string;
  body: string;
  children?: string;
  colorScheme?: ButtonProps['colorScheme'];
  confirmText?: string;
  cancelText?: string;
  onConfirm: (e: any) => Promise<void>;
  onConfirmLoading: boolean;
  loadingText?: string;
}

export default function ButtonDialog({
  title,
  body,
  children = 'Button',
  colorScheme = 'red',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  onConfirm,
  onConfirmLoading = false,
  loadingText,
}: ButtonDialogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button onClick={onOpen} colorScheme={colorScheme}>
        {children}
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{body}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              isLoading={onConfirmLoading}
              loadingText={loadingText}
              colorScheme={colorScheme}
              onClick={onConfirm}
              ml={3}
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
