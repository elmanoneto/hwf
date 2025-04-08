import { useQuery } from '@tanstack/react-query';

export function useBrowserLocation() {
    return useQuery({
        queryKey: ['browser-location'],
        queryFn: () =>
            new Promise<GeolocationPosition>((resolve, reject) => {
                if (!navigator.geolocation) {
                    return reject(new Error('Geolocalização não suportada.'));
                }

                navigator.geolocation.getCurrentPosition(resolve, reject);
            }),
        staleTime: Infinity, // Não precisa refazer a busca
        retry: false,
    });
}
