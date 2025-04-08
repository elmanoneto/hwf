'use client';
import dynamic from 'next/dynamic';
import { ForecastCard, ForecastWrapper } from '@/components/forecast';
import { FORECAST_CONDITIONS } from '@/constants/forecast';
import { Background, Content, Sun } from '@/styles/layout';
import { useQuery } from '@tanstack/react-query';
import { getWeather } from '@/api/api';
import { useBrowserLocation } from '@/hooks/useBrowserLocation';
import { MapPin } from 'lucide-react';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const Cloud = dynamic(() => import('../components/animations/Cloud'), { ssr: false });
const Raindrop = dynamic(() => import('../components/animations/Raindrop'), { ssr: false });
const Snowflake = dynamic(() => import('../components/animations/Snowflake'), { ssr: false });

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
    const { data: location } = useBrowserLocation();

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const coords = location
        ? { latitude: location.coords.latitude, longitude: location.coords.longitude }
        : initialCoords;

    const { data } = useQuery({
        queryKey: ['weather'],
        queryFn: () => getWeather(coords.latitude, coords.longitude),
        initialData: undefined,
        enabled: !!coords,
    });

    const weatherCondition = data?.days[0].weatherDescription ?? '';

    return (
        <Background condition={weatherCondition}>
            <main className="container mx-auto p-8">
                {forecastAnimation[weatherCondition]}

                <div className="flex justify-between">
                    <Content>
                        <h1 className="flex gap-2 font-bold uppercase">
                            <MapPin /> {data?.cityName}
                        </h1>
                        <p className="text-2xl uppercase">{dayjs().format('D MMM')}</p>
                        <p className="text-3xl font-semibold">{dayjs(time).format('HH:mm')}</p>
                        <p className="uppercase">{data?.days[0].weatherDescription}</p>
                    </Content>
                    <Content>
                        <p>Max: {data?.days[0].maxTemp}°C</p>
                        <p>Min: {data?.days[0].minTemp}°C</p>
                        <h1 className="mb-4 text-4xl font-semibold">28°C</h1>
                    </Content>
                </div>

                <ForecastWrapper>
                    {data &&
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        data.days.map((forecastDay: any) => (
                            <ForecastCard.Root key={forecastDay.date}>
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
                                <ForecastCard.ForecastWeather condition={forecastDay.weatherDescription} />
                            </ForecastCard.Root>
                        ))}
                </ForecastWrapper>
            </main>
        </Background>
    );
}
