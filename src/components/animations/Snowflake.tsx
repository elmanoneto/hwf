import { SnowFlakeStyle } from '@/styles/layout';

export default function Snowflake() {
    return (
        <>
            {Array.from({ length: 30 }).map((_, i) => (
                <SnowFlakeStyle
                    key={i}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                />
            ))}
        </>
    );
}
