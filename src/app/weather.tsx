'use client';
import { ForecastCard } from '@/components/forecast';
import { FORECAST_CONDITIONS } from '@/constants/forecast';
import {
    Background,
    Cloud,
    CloudWrapper,
    Content,
    ForecastGrid,
    RainDrop,
    SnowFlake,
    Sun,
} from '@/styles/layout';

export default function WeatherBackground({ condition }: { condition: string }) {
    return (
        <Background condition={condition}>
            <div className="container mx-auto p-8">
                {condition === FORECAST_CONDITIONS.sunny && <Sun />}

                {condition === FORECAST_CONDITIONS.cloudy && (
                    <CloudWrapper>
                        <Cloud style={{ width: '10rem', height: '10rem', top: '2.5rem', left: '3rem' }} />
                        <Cloud
                            style={{
                                width: '8rem',
                                height: '8rem',
                                top: '4rem',
                                left: '1rem',
                                opacity: 0.5,
                            }}
                        />
                        <Cloud
                            style={{
                                width: '6rem',
                                height: '6rem',
                                top: '5rem',
                                left: '6rem',
                                opacity: 0.4,
                            }}
                        />
                    </CloudWrapper>
                )}

                {condition === FORECAST_CONDITIONS.rainy && (
                    <>
                        {Array.from({ length: 50 }).map((_, i) => (
                            <RainDrop
                                key={i}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                }}
                            />
                        ))}
                    </>
                )}

                {condition === FORECAST_CONDITIONS.snowy && (
                    <>
                        {Array.from({ length: 30 }).map((_, i) => (
                            <SnowFlake
                                key={i}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                }}
                            />
                        ))}
                    </>
                )}

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

                <ForecastGrid>
                    {['Mon', 'Tue', 'Wed', 'Thu'].map((day) => (
                        <ForecastCard.Root key={day}>
                            <ForecastCard.ForecastWeekday day={day} />
                            <ForecastCard.ForecastTemperature tempature="28°C" />
                            <ForecastCard.ForecastWeather condition="CLOUDY" />
                        </ForecastCard.Root>
                    ))}
                </ForecastGrid>
            </div>
        </Background>
    );
}
