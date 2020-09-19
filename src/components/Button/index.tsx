import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<buttonProps> = ({children, ...rest}) => (
    <Container type="button" {...rest}>{children}</Container>
);

export default Button;