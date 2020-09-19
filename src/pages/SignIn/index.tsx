import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (

    <Container>
        <Content>
            <img src={logoImg} alt="GoBarber" />

            <form>
                <h1>Login</h1>
                <Input name="email" icon={FiMail} placeholder="E-mail" />

                <Input name="password" icon={FiLock} type="password" placeholder="Password" />

                <Button type="submit">Enter</Button>

                <a href="forgot">Forgotten Password</a>
            </form>

            <a href="">
                <FiLogIn />
                Create account</a>
        </Content>
        <Background />
    </Container>



);

export default SignIn;