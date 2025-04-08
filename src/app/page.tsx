import WeatherApp from './weather';
import { getQueryClient } from '@/lib/query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getWeather } from '@/api/api';
import { getGeoLocation } from '@/api/geolocation';

export default async function Home() {
    const queryClient = getQueryClient();

    const { latitude, longitude } = await getGeoLocation();

    await queryClient.prefetchQuery({
        queryKey: ['weather', { latitude, longitude }],
        queryFn: () => getWeather(latitude, longitude),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <WeatherApp initialCoords={{ latitude, longitude }} />;
        </HydrationBoundary>
    );
}
