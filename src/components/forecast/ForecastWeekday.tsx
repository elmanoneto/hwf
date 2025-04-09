import dayjs from 'dayjs';

type ForecastWeekdayProps = {
    day: string;
};

export default function ForecastWeekday({ day }: ForecastWeekdayProps) {
    return <h2 className="mb-2 text-xl font-semibold">{dayjs(day).format('dddd')}</h2>;
}
