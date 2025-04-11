import { getCityGelocation } from '@/api/geolocation';
import { StyledInput } from '@/styles/layout';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

export default function Search() {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const queryClient = useQueryClient();
    const [, setLocation] = useQueryState('location', { defaultValue: '' });

    async function searchCity() {
        if (!inputValue.trim()) return;

        setErrorMessage('');

        try {
            setLocation(inputValue);

            const cityResult = await getCityGelocation(inputValue);

            if (cityResult) {
                queryClient.setQueryData(['coords'], {
                    latitude: cityResult.latitude,
                    longitude: cityResult.longitude,
                });

                queryClient.invalidateQueries({ queryKey: ['weather'] });
            } else {
                setErrorMessage('City not found. Try again.');
            }
        } catch (error) {
            console.error('Erro to search city:', error);
            setErrorMessage('Error to search city. Try again.');
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.code === 'Enter') {
            searchCity();
        }
    }

    return (
        <div className="relative w-full">
            <StyledInput
                id="inputSearch"
                data-testid="inputSearch"
                type="text"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={'Search...'}
            />
            {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
        </div>
    );
}
