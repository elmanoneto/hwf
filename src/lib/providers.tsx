'use client';

import { ReactNode } from 'react';
import { getQueryClient } from './query-client';
import { QueryClientProvider } from '@tanstack/react-query';

type ProvidersProps = {
    children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    const queryClient = getQueryClient();

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
