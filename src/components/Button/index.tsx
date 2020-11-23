import React, { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
};

const Button: React.FC<buttonProps> = ({ children, loading, ...rest }) => (
    <Container type="button" {...rest}>
        {loading ? "Enviando" : children}
    </Container>
);

export default Button;
