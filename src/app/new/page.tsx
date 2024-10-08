'use client';

import { CREATE_NOTE } from '@/graphql/mutations';
import { GET_NOTES } from '@/graphql/queries';
import { useMutation } from '@apollo/client';
import { ChevronRightIcon, SpinnerIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

export default function NewNoteView() {
  const [newNote, setNewNote] = useState({
    title: '',
    body: '',
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
    }
  }, [newNote.body]); // Run when body changes

  const router = useRouter();
  const toast = useToast();
  const [createNote, { loading, error }] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
    onCompleted: () => {
      toast({
        title: 'Note created successfully',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
      router.push('/');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createNote({
        variables: { title: newNote.title, body: newNote.body },
      });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      {error && (
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
            New
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading my={8}>Add New Note</Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <Input
            id="title"
            value={newNote.title}
            p="2"
            placeholder="Write a title..."
            fontSize="3xl"
            fontWeight="semibold"
            border="none"
            _focus={{
              WebkitBoxShadow: 'none',
            }}
            onChange={(e) =>
              setNewNote((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </FormControl>
        <FormControl mb={6} mt={6}>
          <Textarea
            id="body"
            ref={textareaRef}
            value={newNote.body}
            onChange={(e) =>
              setNewNote((prev) => ({ ...prev, body: e.target.value }))
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
        </FormControl>
        <Flex justifyContent="flex-end">
          <Button
            isLoading={loading}
            loadingText="Saving"
            colorScheme="teal"
            type="submit"
          >
            Save Note
          </Button>
        </Flex>
      </Box>
    </Container>
  );
}
