import { render, screen } from '@testing-library/react';

import { FORECAST_CONDITIONS } from '@/constants/forecast';
import ForecastIcon from '../ForecastIcon';

const conditionToSrcMap = {
    [FORECAST_CONDITIONS.sunny]: '/sunny.svg',
    [FORECAST_CONDITIONS.cloudy]: '/cloudy.svg',
    [FORECAST_CONDITIONS.rainy]: '/rainy.svg',
    [FORECAST_CONDITIONS.snowy]: '/snowy.svg',
};

const sizeToDimensionMap = {
    sm: 80,
    md: 100,
    lg: 120,
};

describe('ForecastIcon', () => {
    test.each(Object.entries(conditionToSrcMap))(
        'renders correct image for condition %s',
        (condition, expectedSrc) => {
            render(<ForecastIcon condition={condition as keyof typeof conditionToSrcMap} size="md" />);
            const image = screen.getByRole('img');
            expect(image).toHaveAttribute('src', expectedSrc);
            expect(image).toHaveAttribute('alt', condition);
        }
    );

    test.each(Object.entries(sizeToDimensionMap))('renders correct size for size %s', (size, dimension) => {
        render(
            <ForecastIcon
                condition={FORECAST_CONDITIONS.sunny}
                size={size as keyof typeof sizeToDimensionMap}
            />
        );
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('width', dimension.toString());
        expect(image).toHaveAttribute('height', dimension.toString());
    });
});
