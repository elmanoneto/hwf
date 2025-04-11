import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '@/api/api';
import '@testing-library/jest-dom';
import React from 'react';
import WeatherApp from '../Weather';

jest.mock('@/api/api', () => ({
    getWeather: jest.fn(),
}));

jest.mock('nuqs', () => ({
    useQueryState: () => [undefined, jest.fn()],
}));

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

const renderWithClient = (ui: React.ReactElement) => {
    const testQueryClient = createTestQueryClient();

    return render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);
};

describe('WeatherApp', () => {
    const initialCoords = { latitude: 0, longitude: 0 };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should show the loading component when the query is loading', async () => {
        (api.getWeather as jest.Mock).mockReturnValue(new Promise(() => {}));

        renderWithClient(<WeatherApp initialCoords={initialCoords} />);

        expect(await screen.findByText(/loading/i)).toBeInTheDocument();
    });

    it('should show an error message when the query fails', async () => {
        (api.getWeather as jest.Mock).mockRejectedValue(new Error('Erro de API'));

        renderWithClient(<WeatherApp initialCoords={initialCoords} />);

        await waitFor(() => {
            expect(screen.getByText(/erro de api/i)).toBeInTheDocument();
        });
    });

    it('should show the weather information when the query is successful', async () => {
        (api.getWeather as jest.Mock).mockResolvedValue({
            cityName: 'Recife',
            days: [
                {
                    date: '2025-04-09',
                    weatherDescription: 'Sunny',
                    maxTemp: 30,
                    minTemp: 20,
                    temp: 25,
                },
            ],
        });

        renderWithClient(<WeatherApp initialCoords={initialCoords} />);

        await waitFor(() => {
            expect(screen.queryByText(/Loading weather forecast.../i)).not.toBeInTheDocument();
        });

        const input = screen.getByTestId('inputSearch');
        await userEvent.type(input, 'João Pessoa');

        expect(await screen.findByText(/Recife/i)).toBeInTheDocument();
        expect(await screen.findByText(/max: 30°c/i)).toBeInTheDocument();
        expect(await screen.findByText(/min: 20°c/i)).toBeInTheDocument();
        // expect(await screen.findByText(/25°c/i)).toBeInTheDocument();
    });
});
