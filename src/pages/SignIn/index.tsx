import React, {useCallback, useRef} from 'react';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';

import {useAuth} from '../../hooks/auth';
import {useToast} from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const {signIn} = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

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

            await signIn({
                email: data.email,
                password: data.password,
            });

            history.push('/dashboard');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Authentication Error',
                description: 'An error has been occured. Please check your credentials.'
            });
        }
    }, [signIn, addToast, history]);

    return (

        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <Input name="email" icon={FiMail} placeholder="E-mail" />

                        <Input name="password" icon={FiLock} type="password" placeholder="Password" />

                        <Button type="submit">Enter</Button>

                        <Link to="/forgot-password">
                            Forgot Password
                        </Link>

                        {/* <a href="forgot">Forgotten Password</a> */}
                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Create account
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
};

export default SignIn;