import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import ForecastWeekday from '../ForecastWeekday';

describe('ForecastWeekday', () => {
    it('should render the correct day', () => {
        const date = new Date(2023, 3, 5);
        render(<ForecastWeekday day={date.toISOString()} />);

        const expectedDay = dayjs(date).format('dddd');
        expect(screen.getByRole('heading')).toHaveTextContent(expectedDay);
    });
});
