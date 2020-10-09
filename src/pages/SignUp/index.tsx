import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiUser , FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUP: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();
    const history = useHistory();


    const handleSubmit = useCallback( async (data: SignUpFormData) => {

        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Name required.'),
                email: Yup.string().required('E-mail required.').email('Invalid format.'),
                password: Yup.string().min(6, 'Minimum 6 characteres.'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);

            history.push('/');

            addToast({
                type: 'success',
                title: 'You have been registered.',
                description: 'You are ready to login on to GoBarber.',
            });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Registration Error',
                description: 'An error has been occured. Please check your details and try again.'
            });
        }
    }, [addToast, history]);

    return (

        <Container>
        <Background />
        <Content>
            <AnimationContainer>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Create User</h1>
                    <Input name="name" icon={FiUser} placeholder="User Name" />

                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input name="password" icon={FiLock} type="password" placeholder="Password" />

                    <Button type="submit">Create</Button>
                </Form>

                <Link to="/">
                    <FiArrowLeft />
                    Back
                </Link>
            </AnimationContainer>
        </Content>

    </Container>

    );
};

export default SignUP;