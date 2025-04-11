export async function getGeoLocation() {
    try {
        const response = await fetch('https://ipwhois.app/json/');
        const data = await response.json();

        const { latitude, longitude } = data;

        return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
    } catch (error) {
        console.error('Erro ao buscar geolocalização:', error);
        return { latitude: 0, longitude: 0 };
    }
}

export async function getCityGelocation(location: string) {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`
    );
    const dataResponse = await response.json();

    const { results } = dataResponse;

    return {
        latitude: results[0].geometry.location.lat,
        longitude: results[0].geometry.location.lng,
    };
}
