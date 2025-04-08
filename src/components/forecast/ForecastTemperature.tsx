type ForecastTemperatureProps = {
    tempature: string;
};

export default function ForecastTemperature({ tempature }: ForecastTemperatureProps) {
    return <h2 className="text-lg">{tempature}°C</h2>;
}
