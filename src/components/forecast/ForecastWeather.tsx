type ForecastWeatherProps = {
    condition: string;
};

export default function ForecastWeather({ condition }: ForecastWeatherProps) {
    return <p className="text-sm">{condition}</p>;
}
