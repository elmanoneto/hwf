import { css, keyframes } from 'styled-components';

const spinSlow = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
`;

const cloudAnimation = css`
    @keyframes cloudMove {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(100px);
        }
    }

    animation: cloudMove 8s ease-in-out infinite alternate;
`;

const rainAnimation = keyframes`
  	0% { transform: translateY(0); }
	100% { transform: translateY(100vh); }
`;

const snowAnimation = keyframes`
	0% { transform: translateY(0); }
	100% { transform: translateY(100vh); }
`;

export { spinSlow, cloudAnimation, rainAnimation, snowAnimation };
