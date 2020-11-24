import React, { ChangeEvent, useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiUser , FiLock, FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AvatarInput } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
    name: string;
    email: string;
    old_password: string;
    password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();
    const history = useHistory();

    const { user, updateUser } = useAuth();


    const handleSubmit = useCallback( async (data: ProfileFormData) => {

        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Name required.'),
                email: Yup.string().required('E-mail required.').email('Invalid format.'),
                old_password: Yup.string(),
                password: Yup.string().when('old_password', {
                    is: val => !!val.length,
                    then: Yup.string().required('Password required'),
                    otherwise: Yup.string(),
                }),
                password_confirmation: Yup.string().when('old_password', {
                    is: val => !!val.length,
                    then: Yup.string().required('Password confirmation required'),
                    otherwise: Yup.string(),
                })
                .oneOf([Yup.ref('password'), undefined], 'Password must match'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { name, email, old_password, password, password_confirmation } = data;

            const formData = {
                name,
                email,
                ...(old_password ? {
                    old_password,
                    password,
                    password_confirmation,
                } : {}),
            }

            const response = await api.put('/profile', formData);

            updateUser(response.data);

            history.push('/dashboard');

            addToast({
                type: 'success',
                title: 'Profile updated.',
                description: 'You profile has been updated.',
            });

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Profile Update Error',
                description: 'An error has been occured. Please check your details and try again.'
            });
        }
    }, [addToast, history, updateUser]);

    const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {


        if (e.target.files) {
            const data = new FormData();
            data.append('avatar', e.target.files[0]);

            api.patch('/users/avatar', data)
            .then((response) => {
                updateUser(response.data);
                addToast({
                    type: 'success',
                    title: 'Avatar updated!',
                })
            });
        }
    },[addToast, updateUser]);

    return (

        <Container>

            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>

        <Content>
            <Form ref={formRef} initialData={{
                name: user.name,
                email: user.email,
            }} onSubmit={handleSubmit}>
                <AvatarInput>
                    <img src={user.avatar_url} alt={user.name}/>
                    <label htmlFor="avatar">
                        <FiCamera />
                        <input type="file" id="avatar" onChange={handleAvatarChange} />
                    </label>

                </AvatarInput>

                <h1>My profile</h1>

                <Input name="name" icon={FiUser} placeholder="User Name" />

                <Input name="email" icon={FiMail} placeholder="E-mail" />

                <Input
                    containerStyle={{ marginTop: 24 }}
                    name="old_password"
                    icon={FiLock}
                    type="password"
                    placeholder="Old Password"
                />

                <Input name="password" icon={FiLock} type="password" placeholder="New Password" />

                <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Password Confirmation" />

                <Button type="submit">Confirm</Button>
            </Form>
        </Content>

    </Container>

    );
};

export default Profile;