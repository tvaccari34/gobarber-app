import React, { useCallback, useRef, useState } from "react";
import * as Yup from "yup";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Link } from "react-router-dom";

import getValidationErrors from "../../utils/getValidationErrors";

import { useToast } from "../../hooks/toast";

import logoImg from "../../assets/logo.svg";
import { Container, Content, Background, AnimationContainer } from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../services/api";

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const handleSubmit = useCallback(
        async (data: ForgotPasswordFormData) => {
            setLoading(true);

            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required("E-mail required.")
                        .email("Invalid format."),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                //password recovery
                await api.post("/password/forgot", {
                    email: data.email,
                });

                addToast({
                    type: "success",
                    title: "Password recovery e-mail has been sent.",
                    description:
                        "We have sent an e-mail to confirm the password recovery. Please, check your inbox.",
                });

                //history.push('/dashboard');
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(error);

                    formRef.current?.setErrors(errors);

                    return;
                }

                addToast({
                    type: "error",
                    title: "Recovery Password Error",
                    description:
                        "An error has been occured when trying to recovery password",
                });
            } finally {
                setLoading(false);
            }
        },
        [addToast]
    );

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Password Recovery</h1>
                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />

                        <Button loading={loading} type="submit">
                            Enter
                        </Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Back
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default ForgotPassword;
