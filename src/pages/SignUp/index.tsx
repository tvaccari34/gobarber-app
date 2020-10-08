import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiUser , FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUP: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback( async (data: object) => {

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
        } catch (error) {
            console.log(error);
            const errors = getValidationErrors(error);

            formRef.current?.setErrors(errors);
        }
    }, []);

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