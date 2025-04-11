import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '@/components/search/Search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import * as api from '@/api/geolocation';

jest.mock('nuqs', () => ({
    useQueryState: jest.fn(),
}));

jest.mock('@/api/geolocation', () => ({
    getCityGelocation: jest.fn(),
}));

describe('Search Component', () => {
    const mockSetLocation = jest.fn();

    const setup = () => {
        const queryClient = new QueryClient();
        (useQueryState as jest.Mock).mockReturnValue(['', mockSetLocation]);

        return render(
            <QueryClientProvider client={queryClient}>
                <Search />
            </QueryClientProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders input correctly', () => {
        setup();
        const input = screen.getByPlaceholderText('Search...');
        expect(input).toBeInTheDocument();
    });

    it('does not call API if input is empty', async () => {
        setup();
        const input = screen.getByPlaceholderText('Search...');
        fireEvent.keyDown(input, { code: 'Enter' });
        await waitFor(() => {
            expect(api.getCityGelocation).not.toHaveBeenCalled();
        });
    });

    it('calls API and updates query data on valid input', async () => {
        const mockCityResult = { latitude: 1, longitude: 2 };
        (api.getCityGelocation as jest.Mock).mockResolvedValue(mockCityResult);

        setup();

        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'São Paulo' } });
        fireEvent.keyDown(input, { code: 'Enter' });

        await waitFor(() => {
            expect(mockSetLocation).toHaveBeenCalledWith('São Paulo');
            expect(api.getCityGelocation).toHaveBeenCalledWith('São Paulo');
        });
    });

    it('shows error message if city is not found', async () => {
        (api.getCityGelocation as jest.Mock).mockResolvedValue(null);

        setup();

        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'CidadeInexistente' } });
        fireEvent.keyDown(input, { code: 'Enter' });

        const errorMessage = await screen.findByText('City not found. Try again.');
        expect(errorMessage).toBeInTheDocument();
    });

    it('shows error message on API error', async () => {
        (api.getCityGelocation as jest.Mock).mockRejectedValue(new Error('API Error'));

        setup();

        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'ErroCidade' } });
        fireEvent.keyDown(input, { code: 'Enter' });

        const errorMessage = await screen.findByText('Error to search city. Try again.');
        expect(errorMessage).toBeInTheDocument();
    });
});
