'use client';
import dynamic from 'next/dynamic';

const Cloud = dynamic(() => import('../components/animations/Cloud'), { ssr: false });
const Raindrop = dynamic(() => import('../components/animations/Raindrop'), { ssr: false });
const Snowflake = dynamic(() => import('../components/animations/Snowflake'), { ssr: false });

import { ForecastCard, ForecastWrapper } from '@/components/forecast';
import { FORECAST_CONDITIONS } from '@/constants/forecast';
import { Background, Content, Sun } from '@/styles/layout';

const forecastAnimation = {
    [FORECAST_CONDITIONS.sunny]: <Sun />,
    [FORECAST_CONDITIONS.cloudy]: <Cloud />,
    [FORECAST_CONDITIONS.rainy]: <Raindrop />,
    [FORECAST_CONDITIONS.snowy]: <Snowflake />,
};

export default function WeatherBackground({ condition }: { condition: string }) {
    return (
        <Background condition={condition}>
            <main className="container mx-auto p-8">
                {forecastAnimation[condition]}

                <div className="flex justify-between">
                    <Content>
                        <h1 className="font-bold">JOÃO PESSOA</h1>
                        <p className="text-2xl">7 ABRIL</p>
                        <p className="text-3xl font-semibold">22:30</p>
                        <p className="">CLOUDY</p>
                    </Content>
                    <Content>
                        <p>PREASSURE: 1013hPa</p>
                        <p>SUNRISE: 06:00</p>
                        <p>SUNSET: 18:00</p>
                        <h1 className="mb-4 text-4xl font-semibold">28°C</h1>
                    </Content>
                </div>

                <ForecastWrapper>
                    {['Mon', 'Tue', 'Wed', 'Thu'].map((day) => (
                        <ForecastCard.Root key={day}>
                            <ForecastCard.ForecastWeekday day={day} />
                            <ForecastCard.ForecastIcon
                                condition={FORECAST_CONDITIONS[condition as keyof typeof FORECAST_CONDITIONS]}
                                size="md"
                            />
                            <ForecastCard.ForecastTemperature tempature="28°C" />
                            <ForecastCard.ForecastWeather condition="CLOUDY" />
                        </ForecastCard.Root>
                    ))}
                </ForecastWrapper>
            </main>
        </Background>
    );
}
