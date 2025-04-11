'use client';
import dynamic from 'next/dynamic';
import { ForecastCard, ForecastWrapper } from '@/components/forecast';
import { FORECAST_CONDITIONS } from '@/constants/forecast';
import { Background, Content, Sun } from '@/styles/layout';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getWeather } from '@/api/api';
import { MapPin } from 'lucide-react';
import dayjs from 'dayjs';
import { Suspense } from 'react';
import Search from '@/components/search/Search';
import WeatherError from './WeatherError';
import WeatherLoading from './WeatherLoading';

const Cloud = dynamic(() => import('../../components/animations/Cloud'), { ssr: false });
const Raindrop = dynamic(() => import('../../components/animations/Raindrop'), { ssr: false });
const Snowflake = dynamic(() => import('../../components/animations/Snowflake'), { ssr: false });

type WeatherAppProps = {
    initialCoords: {
        latitude: number;
        longitude: number;
    };
};

const forecastAnimation = {
    [FORECAST_CONDITIONS.sunny]: <Sun />,
    [FORECAST_CONDITIONS.cloudy]: <Cloud />,
    [FORECAST_CONDITIONS.rainy]: <Raindrop />,
    [FORECAST_CONDITIONS.snowy]: <Snowflake />,
};

export default function WeatherApp({ initialCoords }: WeatherAppProps) {
    const queryClient = useQueryClient();

    const { data: coords } = useQuery({
        queryKey: ['coords'],
        queryFn: async () => {
            const location = queryClient.getQueryData<{ latitude: number; longitude: number }>(['coords']);
            return location ?? initialCoords;
        },
        initialData: initialCoords,
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['weather', coords.latitude, coords.longitude],
        queryFn: () => getWeather(coords.latitude, coords.longitude),
        initialData: undefined,
        enabled: !!coords,
        refetchOnMount: false,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const weatherCondition = data?.days[0].weatherDescription ?? '';

    if (isLoading) {
        return <WeatherLoading />;
    }

    if (isError) {
        return <WeatherError error={error} />;
    }

    return (
        <Background condition={weatherCondition}>
            <main className="container mx-auto p-8">
                {forecastAnimation[weatherCondition]}

                <div className="flex flex-col gap-4 md:flex-row">
                    <Content className="w-full md:w-sm">
                        <h1 className="gap-2 font-bold uppercase">
                            <MapPin className="inline" /> {data?.cityName}
                        </h1>
                        <p className="text-2xl uppercase">{dayjs().format('D MMM')}</p>
                        <p className="uppercase">{data?.days[0].weatherDescription}</p>
                    </Content>
                    <Content className="w-full md:w-sm">
                        <Search />
                    </Content>
                    <Content className="w-full md:w-sm">
                        <p>Max: {data?.days[0].maxTemp}°C</p>
                        <p>Min: {data?.days[0].minTemp}°C</p>
                        <h1 className="mb-4 text-4xl font-semibold">{data?.days[0].temp}°C</h1>
                    </Content>
                </div>

                <ForecastWrapper>
                    {data &&
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        data.days.map((forecastDay: any) => (
                            <Suspense key={forecastDay.date} fallback={<div>Loading...</div>}>
                                <ForecastCard.Root>
                                    <ForecastCard.ForecastWeekday day={forecastDay.date} />
                                    <ForecastCard.ForecastIcon
                                        condition={
                                            FORECAST_CONDITIONS[
                                                forecastDay.weatherDescription as keyof typeof FORECAST_CONDITIONS
                                            ]
                                        }
                                        size="md"
                                    />
                                    <ForecastCard.ForecastTemperature tempature={forecastDay.temp} />
                                    <ForecastCard.ForecastWeather
                                        condition={forecastDay.weatherDescription}
                                    />
                                </ForecastCard.Root>
                            </Suspense>
                        ))}
                </ForecastWrapper>
            </main>
        </Background>
    );
}
