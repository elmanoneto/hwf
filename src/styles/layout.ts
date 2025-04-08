import { FORECAST_CONDITIONS } from './../constants/forecast';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { cloudAnimation, rainAnimation, snowAnimation, spinSlow } from '@/styles/animations';

export const Background = tw.div<{ condition: typeof FORECAST_CONDITIONS }>`
    relative
    min-h-screen
    flex
    flex-col
    items-center
    justify-center
    text-black
    overflow-hidden
    transition-all
    duration-1000
  ${(p) => {
      switch (p.condition) {
          case 'sunny':
              return 'bg-gradient-to-b from-[#fff7d6] via-[#ffe1b3] to-[#fff7d6]';
          case 'rainy':
              return 'bg-gradient-to-b from-[#374151] via-[#111827] to-black';
          case 'cloudy':
              return 'bg-gradient-to-b from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af]';
          case 'snowy':
              return 'bg-gradient-to-b from-[#bfdbfe] via-[#dbeafe] to-white';
          default:
              return 'bg-gradient-to-b from-white to-white';
      }
  }}
`;

export const Sun = styled(tw.div`
    absolute
    top-20
    left-1/2
    w-32
    h-32
    bg-yellow-300
    rounded-full
    opacity-50
    shadow-[0_0_60px_#facc15]
`)`
    animation: ${spinSlow} 20s linear infinite;
`;

export const CloudWrapper = styled(tw.div`
    sm:absolute
    left-0
    sm:w-full
    sm:h-64
    pointer-events-none
    sm:top-20
    sm:left-50
`)``;

export const Cloud = styled(tw.div`
    absolute 
    top-10
    left-0
    w-32
    h-20 
    bg-white 
    bg-opacity-70 
    rounded-full 
    shadow-lg
    opacity-80
    pointer-events-none
`)`
    ${cloudAnimation};
    box-shadow:
        [] 30px 10px 0 0 rgba(255, 255, 255, 0.7),
        60px 15px 0 0 rgba(255, 255, 255, 0.6),
        90px 5px 0 0 rgba(255, 255, 255, 0.5);
`;

export const RainDrop = styled(tw.div`
    absolute
    w-0.5
    h-5
    bg-blue-500
`)`
    animation: ${rainAnimation} 2s linear infinite;
`;

export const SnowFlake = styled(tw.div`
    absolute
    w-2
    h-2
    bg-white
    rounded-full
    opacity-75
`)`
    animation: ${snowAnimation} 5s linear infinite;
`;

export const Content = tw.div`
    text-center
    z-10
`;

export const ForecastGrid = tw.section`
    relative
    mt-10
    flex
    gap-4
    flex-col
    md:flex-row
`;

export const ForecastCard = tw.div`
    backdrop-blur-2xl
    bg-white/20
    shadow-sm
    p-8
    w-full
    flex
    flex-col
    items-center
    align-middle
    justify-center
`;
