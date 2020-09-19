import React from 'react';
import { FiArrowLeft, FiMail, FiUser , FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUP: React.FC = () => (

    <Container>
        <Background />
        <Content>
            <img src={logoImg} alt="GoBarber" />

            <form>
                <h1>Create User</h1>
                <Input name="name" icon={FiUser} placeholder="User Name" />

                <Input name="email" icon={FiMail} placeholder="E-mail" />

                <Input name="password" icon={FiLock} type="password" placeholder="Password" />

                <Button type="submit">Create</Button>
            </form>

            <a href="">
                <FiArrowLeft />
                Back</a>
        </Content>

    </Container>



);

export default SignUP;