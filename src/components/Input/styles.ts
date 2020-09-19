import styled, { css } from 'styled-components';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`

background: #232129;
border-radius: 10px;
padding: 16px;
width: 100%;

color: #666360;
border: 2px solid #232129;

display: flex;
align-items: center;

& + div {
        margin-top: 8px;
    }

${props => props.isFocused && css`
    color: #ff9000;
    border-color: #ff9000;
`}

${props => props.isFilled && css`
    color: #ff9000;
`}

input {

    flex: 1;
    border: 0;
    background: transparent;
    color: #F4EDE8;

    &::placeholder {
        color: #666360;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: #f4ede8;
      -webkit-box-shadow: 0 0 0px 1000px #232129 inset;
    }
}

svg {
    margin-right: 16px;
}

`;