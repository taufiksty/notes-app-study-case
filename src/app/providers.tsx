'use client';

import client from '@/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
