import { formatWeatherDescription } from '@/helpers/formatWeatherDescription';

export async function getWeather(latitude: number, longitude: number) {
    const response = await fetch(
        `http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=510a0c10e7094bc981615941df2e6788`
    );
    const dataResponse = await response.json();

    const { city_name, data } = dataResponse;

    return {
        cityName: city_name,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        days: data.slice(0, 5).map((item: any) => {
            return {
                date: item.valid_date,
                maxTemp: item.max_temp,
                minTemp: item.min_temp,
                temp: item.temp,
                weatherDescription: formatWeatherDescription(item.weather.description),
            };
        }),
    };
}
