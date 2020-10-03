import React, {useCallback, useRef} from 'react';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import {useAuth} from '../../hooks/AuthContext';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const {signIn} = useAuth();

    const handleSubmit = useCallback( async (data: SignInFormData) => {

        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail required.').email('Invalid format.'),
                password: Yup.string().min(6, 'Password required.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            signIn({
                email: data.email,
                password: data.password,
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);
            }

        }
    }, [signIn]);

    return (

        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input name="password" icon={FiLock} type="password" placeholder="Password" />

                    <Button type="submit">Enter</Button>

                    <a href="forgot">Forgotten Password</a>
                </Form>

                <a href="">
                    <FiLogIn />
                    Create account</a>
            </Content>
            <Background />
        </Container>
    )
};

export default SignIn;