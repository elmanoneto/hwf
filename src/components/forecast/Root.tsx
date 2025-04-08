import { ForecastCard } from '@/styles/layout';
import { ReactNode } from 'react';

interface RootProps {
    children: ReactNode;
}

export function Root({ children }: RootProps) {
    return <ForecastCard>{children}</ForecastCard>;
}
