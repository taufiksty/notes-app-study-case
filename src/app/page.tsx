'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Flex,
  Button,
  keyframes,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { Note } from '@/types/note';
import { GET_NOTES } from '@/graphql/queries';
import dateFormat from '@/utils/dateFormat';

export default function AllNotesView() {
  const { data, loading, error } = useQuery(GET_NOTES);
  const notes: Note[] = (data?.notes.slice() || []).sort(
    (a: Note, b: Note) =>
      new Date(Number(a.createdAt)).getTime() -
      new Date(Number(b.createdAt)).getTime()
  );

  const toast = useToast();
  if (error) {
    toast({
      title:
        'Sorry, it seems like something went wrong. Please refresh the page.',
      status: 'error',
      isClosable: true,
      position: 'top',
    });
  }

  const clickAnimation = keyframes({
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(0.95)' },
    '100%': { transform: 'scale(1)' },
  });

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
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink
            href="/"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            fontSize="sm"
          >
            Notes
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between" alignItems="center" my="8">
        <Heading as="h1">All Notes</Heading>
        <Link href="/new" passHref>
          <Button colorScheme="teal">Add note</Button>
        </Link>
      </Flex>
      {loading ? (
        <Spinner my="24" />
      ) : notes.length === 0 ? (
        <Text my="24">No notes found.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} mt="4" spacing={6}>
          {notes.map((note: Note) => (
            <Link key={note.id} href={`/notes/${note.id}`} passHref>
              <Card
                height="100%"
                border="1px"
                borderColor="white"
                borderRadius="md"
                _hover={{ boxShadow: 'lg', transform: 'translateY(-4px)' }}
                _active={{ animation: `${clickAnimation} 0.2s ease` }}
                _focus={{ boxShadow: 'outline' }}
                transition="all 0.2s ease"
              >
                <CardHeader>
                  <Heading size="md">
                    {' '}
                    {note.title.length > 20
                      ? note.title.substring(0, 20) + '...'
                      : note.title}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontSize="sm">
                    {note.body.length > 100
                      ? note.body.substring(0, 100) + '...'
                      : note.body}
                  </Text>
                </CardBody>
                <CardFooter>
                  <Text fontSize="sm" textAlign="right" width="full">
                    {dateFormat(note.updatedAt)}
                  </Text>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
