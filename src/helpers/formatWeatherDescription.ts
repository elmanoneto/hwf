export function formatWeatherDescription(description: string) {
    const lowerDescription = description.toLowerCase();

    if (lowerDescription === 'clear sky' || lowerDescription === 'few clouds') {
        return 'sunny';
    }

    if (lowerDescription.includes('clouds')) {
        return 'cloudy';
    }

    if (lowerDescription.includes('rain')) {
        return 'rainy';
    }

    return 'snowy';
}
