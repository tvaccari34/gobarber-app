import React, {useCallback, useRef} from 'react';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback( async (data: object) => {

        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail required.').email('Invalid format.'),
                password: Yup.string().min(6, 'Password required.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
        } catch (error) {
            console.log(error);
            const errors = getValidationErrors(error);

            formRef.current?.setErrors(errors);
        }
    }, []);

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