import { formatWeatherDescription } from '../formatWeatherDescription';

describe('formatWeatherDescription', () => {
    it('should return "sunny" for clear sky and few clouds', () => {
        expect(formatWeatherDescription('clear sky')).toBe('sunny');
        expect(formatWeatherDescription('few clouds')).toBe('sunny');
    });

    it('should return "cloudy" for descriptions containing "clouds"', () => {
        expect(formatWeatherDescription('scattered clouds')).toBe('cloudy');
        expect(formatWeatherDescription('broken clouds')).toBe('cloudy');
        expect(formatWeatherDescription('overcast clouds')).toBe('cloudy');
    });

    it('should return "rainy" for descriptions containing "rain"', () => {
        expect(formatWeatherDescription('light rain')).toBe('rainy');
        expect(formatWeatherDescription('heavy rain')).toBe('rainy');
        expect(formatWeatherDescription('moderate rain')).toBe('rainy');
    });

    it('should return "snowy" for other descriptions', () => {
        expect(formatWeatherDescription('snow')).toBe('snowy');
        expect(formatWeatherDescription('thunderstorm')).toBe('snowy');
        expect(formatWeatherDescription('mist')).toBe('snowy');
    });

    it('should be case insensitive', () => {
        expect(formatWeatherDescription('CLEAR SKY')).toBe('sunny');
        expect(formatWeatherDescription('FEW CLOUDS')).toBe('sunny');
        expect(formatWeatherDescription('Light Rain')).toBe('rainy');
        expect(formatWeatherDescription('ScAtTeReD ClOuDs')).toBe('cloudy');
    });
});
