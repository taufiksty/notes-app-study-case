'use client';

import ButtonDialog from '@/components/common/ButtonDialog';
import { DELETE_NOTE, UPDATE_NOTE } from '@/graphql/mutations';
import { GET_NOTE, GET_NOTES } from '@/graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  FormControl,
  Input,
  Textarea,
  Flex,
  Button,
  Skeleton,
  SkeletonText,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function NoteView() {
  const { id } = useParams();

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_NOTE, {
    variables: { id },
    skip: !id,
  });
  const [note, setNote] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    setNote({
      title: data?.note?.title || '',
      body: data?.note?.body || '',
    });
  }, [data]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
    }
  }, [note.body]); // Run when body changes

  const toast = useToast();
  const router = useRouter();
  const [updateNote, { loading: updateLoading }] = useMutation(UPDATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
    onCompleted: () => {
      toast({
        title: 'Note updated successfully',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      router.push('/');
    },
    onError: (error) => {
      toast({
        title: 'Error updating note',
        description: error.message,
        status: 'error',
        isClosable: true,
        duration: 10000,
        position: 'top',
      });
    },
  });
  const [deleteNote, { loading: deleteLoading }] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
    onCompleted: () => {
      toast({
        title: 'Note deleted successfully',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      router.push('/');
    },
    onError: (error) => {
      toast({
        title: 'Error deleting note',
        description: error.message,
        status: 'error',
        isClosable: true,
        duration: 10000,
        position: 'top',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateNote({
        variables: {
          id,
          title: note.title,
          body: note.body,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      await deleteNote({
        variables: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      {queryError && (
        <Alert status="error" mb={8}>
          <AlertIcon />
          Sorry, it seems like something went wrong. Please refresh the page.
        </Alert>
      )}
      <Breadcrumb
        border="1px"
        borderRadius="md"
        borderColor="white"
        py="1"
        px="2"
        bg="white"
        width="fit-content"
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            fontSize="sm"
          >
            Notes
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink
            href="/new"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            fontSize="sm"
          >
            {id}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box as="form" onSubmit={handleSubmit} mt={8}>
        <FormControl mb={4} isRequired>
          <Skeleton isLoaded={!queryLoading}>
            <Input
              id="title"
              value={note.title}
              p="2"
              placeholder="Write a title..."
              fontSize="3xl"
              fontWeight="semibold"
              border="none"
              _focus={{
                WebkitBoxShadow: 'none',
              }}
              onChange={(e) =>
                setNote((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </Skeleton>
        </FormControl>
        <FormControl mb={6} mt={6}>
          <SkeletonText
            isLoaded={!queryLoading}
            height="200px"
            noOfLines={5}
            spacing={4}
            skeletonHeight={5}
          >
            <Textarea
              id="body"
              ref={textareaRef}
              value={note.body}
              onChange={(e) =>
                setNote((prev) => ({ ...prev, body: e.target.value }))
              }
              p="2"
              placeholder="Write a body ..."
              minH="200px"
              resize="none"
              overflow="hidden"
              whiteSpace="pre-wrap"
              border="none"
              _focus={{
                WebkitBoxShadow: 'none',
              }}
            />
          </SkeletonText>
        </FormControl>
        <Flex justifyContent="end" gap={4}>
          <Button
            isLoading={updateLoading}
            loadingText="Saving"
            colorScheme="teal"
            type="submit"
          >
            Save
          </Button>
          <ButtonDialog
            title="Are you sure?"
            body="Just confirm if you want to delete this note."
            colorScheme="red"
            onConfirm={handleDelete}
            onConfirmLoading={deleteLoading}
            loadingText="Deleting"
          >
            Delete
          </ButtonDialog>
        </Flex>
      </Box>
    </Container>
  );
}
