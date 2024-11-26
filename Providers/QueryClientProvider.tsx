'use client';

import { QueryClient, QueryClientProvider as QCProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <QCProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools /> */}
    </QCProvider>
  );
}
