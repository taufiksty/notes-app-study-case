import { Note } from '@/types/note';
import dateFormat from '@/utils/dateFormat';
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Text,
  keyframes,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function CardNote({
  id,
  title,
  body,
  createdAt,
  updatedAt,
}: Note) {
  const clickAnimation = keyframes({
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(0.95)' },
    '100%': { transform: 'scale(1)' },
  });

  return (
    <Link key={id} href={`/notes/${id}`} passHref>
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
            {title.length > 20 ? title.substring(0, 20) + '...' : title}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm">
            {body.length > 100 ? body.substring(0, 100) + '...' : body}
          </Text>
        </CardBody>
        <CardFooter>
          <Text fontSize="sm" textAlign="right" width="full">
            {dateFormat(updatedAt)}
          </Text>
        </CardFooter>
      </Card>
    </Link>
  );
}
