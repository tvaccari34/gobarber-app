import React, {useCallback, useRef} from 'react';
import * as Yup from 'yup';
import { FiLock, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link, useHistory, useLocation } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';

import {useToast} from '../../hooks/toast';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const location = useLocation();
    console.log(location);

    const handleSubmit = useCallback( async (data: ResetPasswordFormData) => {

        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                password: Yup.string().min(6, 'Password required.'),
                password_confirmation: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Password must match')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { password, password_confirmation } = data;
            const token = location.search.replace('?token=', '');

            if (!token) {
                throw new Error();
            }

            await api.post('/password/reset', {
                token,
                password,
                password_confirmation,
            })

            history.push('/');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Reset Password Error',
                description: 'An error has been occured. Please try it again.'
            });
        }
    }, [addToast, history, location.search]);

    return (

        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Reset Password</h1>
                        <Input name="password" icon={FiLock} type="password" placeholder="New password" />
                        <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Password confirmation" />

                        <Button type="submit">Change password</Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        back
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
};

export default ResetPassword;