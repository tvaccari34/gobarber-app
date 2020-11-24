import styled from 'styled-components';
//import signUpBackgroupImage from '../../assets/sign-up-background.png';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    place-content: center;
    margin: 0 auto;

    width: 100%;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
            color: #F4EDE8;
        }

        a {
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, '#F4EDE8')}
            }
        }
    }

    > a {
        color: #FF9000;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;

        display: flex;
        align-items: center;

        svg {
            margin-right: 16px;
        }

        &:hover {
            color: ${shade(0.2, '#FF9000')}
        }
    }

`;

// const appearFromRight = keyframes`
//     from {
//         opacity: 0;
//         transform: translateX(50px);
//     }
//     to {
//         opacity: 1;
//         transform: translateX(0px);
//     }
// `;

// export const AnimationContainer = styled.div`

//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;

//     animation: ${appearFromRight} 1s;



// `;

// export const Background = styled.div`
//     flex: 1;
//     background: url(${signUpBackgroupImage}) no-repeat center;
//     background-size: cover;

// `;