'use client';

import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box,
  FormControl,
  Input,
  Textarea,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import notes from '../../../../data';

export default function NoteView() {
  const { id } = useParams();
  const [note, setNote] = useState({
    title: '',
    body: '',
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchNote = () => {
      const note = notes.find((note) => note.id === Number(id));
      setNote(note || { title: '', body: '' });
    };

    fetchNote();
  }, [id]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
    }
  }, [note.body]); // Run when body changes

  const handleSubmit = () => {};

  return (
    <Container maxW="container.lg" py={8}>
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
      <Heading my={8}>Add New Note</Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          {/* <FormLabel htmlFor="title">Title</FormLabel> */}
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
        </FormControl>
        <FormControl mb={6} mt={6}>
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
        </FormControl>
        <Flex justifyContent="end" gap={4}>
          <Button colorScheme="teal" px="10">
            Save
          </Button>
          <Button colorScheme="red">Delete</Button>
        </Flex>
      </Box>
    </Container>
  );
}
