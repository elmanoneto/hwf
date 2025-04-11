import { getQueryClient } from '@/lib/query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getWeather } from '@/api/api';
import { getCityGelocation, getGeoLocation } from '@/api/geolocation';
import WeatherApp from '@/components/app/Weather';

export default async function Home({ searchParams }: { searchParams?: Promise<{ location: string }> }) {
    const queryClient = getQueryClient();
    const search = await searchParams;

    if (search?.location && search.location.length >= 6) {
        const data = await getCityGelocation(search.location);

        queryClient.prefetchQuery({
            queryKey: ['weather'],
            queryFn: () => getWeather(latitude, longitude),
        });

        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <WeatherApp initialCoords={{ latitude: data.latitude, longitude: data.longitude }} />;
            </HydrationBoundary>
        );
    }

    const { latitude, longitude } = await getGeoLocation();

    queryClient.prefetchQuery({
        queryKey: ['weather'],
        queryFn: () => getWeather(latitude, longitude),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <WeatherApp initialCoords={{ latitude, longitude }} />;
        </HydrationBoundary>
    );
}
