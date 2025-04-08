type ForecastWeekdayProps = {
    day: string;
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function ForecastWeekday({ day }: ForecastWeekdayProps) {
    const date = new Date(day);
    const formattedDate = date.getUTCDay();

    return <h2 className="mb-2 text-xl font-semibold">{days[formattedDate]}</h2>;
}
