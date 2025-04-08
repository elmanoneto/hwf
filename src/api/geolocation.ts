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
