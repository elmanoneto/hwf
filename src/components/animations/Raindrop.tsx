import { RainDropStyle } from '@/styles/layout';

export default function RainDrop() {
    return (
        <>
            {Array.from({ length: 50 }).map((_, i) => (
                <RainDropStyle
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
