import { CloudWrapperStyle, CloudStyle } from '@/styles/layout';

export default function Cloud() {
    return (
        <CloudWrapperStyle>
            <CloudStyle style={{ width: '10rem', height: '10rem', top: '2.5rem', left: '3rem' }} />
            <CloudStyle
                style={{
                    width: '8rem',
                    height: '8rem',
                    top: '4rem',
                    left: '1rem',
                    opacity: 0.5,
                }}
            />
            <CloudStyle
                style={{
                    width: '6rem',
                    height: '6rem',
                    top: '5rem',
                    left: '6rem',
                    opacity: 0.4,
                }}
            />
        </CloudWrapperStyle>
    );
}
