import { Background } from '@/styles/layout';

export default function WeatherLoading() {
    return (
        <Background condition="sunny">
            <main className="container mx-auto p-8 text-center">
                <p className="text-2xl font-semibold">Loading weather forecast...</p>
            </main>
        </Background>
    );
}
