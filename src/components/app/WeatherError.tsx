import { Background } from '@/styles/layout';

type WeatherErrorProps = {
    error: Error;
};

export default function WeatherError({ error }: WeatherErrorProps) {
    return (
        <Background condition="sunny">
            <main className="container mx-auto p-8 text-center">
                <p className="text-2xl font-semibold text-red-500">Error to loading wrather forecast! 😞</p>
                <p className="mt-2">{(error as Error).message}</p>
            </main>
        </Background>
    );
}
