import { ReactNode } from 'react';
import { ForecastWrapperStyle } from '@/styles/layout';

type ForecastWrapperProps = {
    children: ReactNode;
};

export default function ForecastWrapper({ children }: ForecastWrapperProps) {
    return <ForecastWrapperStyle>{children}</ForecastWrapperStyle>;
}
