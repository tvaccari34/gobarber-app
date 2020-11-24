import styled from 'styled-components';
//import signUpBackgroupImage from '../../assets/sign-up-background.png';
import { shade } from 'polished';

export const Container = styled.div`

    > header {
        height: 144px;
        background: #28262E;

        display: flex;
        align-items: center;

        div{
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;

            svg {
                color: #999591;
                width: 24px;
                height: 24px;
            }
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    place-content: center;
    margin: -176px 0 auto;

    width: 100%;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        display: flex;
        flex-direction: column;

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

    input[name='old_passord']{
        margin-top: 24px;
    }

`;

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    width: 186px;
    align-self: center;
    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }

    label {
        position: absolute;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #ff9000;
        right: 0;
        bottom: 0;
        border: 0;
        transition: 0.2s;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        svg{
            width: 20px;
            height: 20px;
            color: #312E38;
        }

        &:hover{
        background: ${shade(0.2, '#ff9000')}
        }

        input {
            display: none;
        }
    }
`;