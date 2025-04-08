import { FORECAST_CONDITIONS } from '@/constants/forecast';
import Image from 'next/image';

type ForecastIconProps = {
    condition: keyof typeof FORECAST_VALUES;
    size: 'sm' | 'md' | 'lg';
};

const FORECAST_VALUES = {
    [FORECAST_CONDITIONS.sunny]: '/sunny.svg',
    [FORECAST_CONDITIONS.cloudy]: '/cloudy.svg',
    [FORECAST_CONDITIONS.rainy]: '/rainy.svg',
    [FORECAST_CONDITIONS.snowy]: '/snowy.svg',
};

const sizes = {
    sm: 80,
    md: 100,
    lg: 120,
} as const;

export default function ForecastIcon({ condition, size }: ForecastIconProps) {
    return (
        <Image
            src={FORECAST_VALUES[condition]}
            alt={condition as string}
            width={sizes[size]}
            height={sizes[size]}
        />
    );
}
