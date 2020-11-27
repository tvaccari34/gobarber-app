import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
    return {
        useField() {
            return {
                fieldName: 'email',
                defaultValue: '',
                error: '',
                registerField: jest.fn(),
            }
        }
    }
});

describe('Input component', () => {
    it('should be able to render an input', () => {
        const { getByPlaceholderText } = render(<Input name="email" placeholder="E-mail" />,)

        expect(getByPlaceholderText('E-mail')).toBeTruthy();
    });

    it('should render highlight on input focus', async () => {
        const { getByPlaceholderText, getByTestId } = render(<Input name="email" placeholder="E-mail" />,)

        const inputElement = getByPlaceholderText('E-mail');
        const containerElement = getByTestId('input-container')

        fireEvent.focus(inputElement)

        await waitFor(() => expect(containerElement).toHaveStyle('border-color: #ff9000;'));

        await waitFor (() => expect(containerElement).toHaveStyle('color: rgb(255, 144, 0);'));

        fireEvent.blur(inputElement)

        await waitFor(() => expect(containerElement).not.toHaveStyle('border-color: #ff9000;'));

        await waitFor (() => expect(containerElement).not.toHaveStyle('color: rgb(255, 144, 0);'));

    });

    it('should keep input border highlighted when input filled', async () => {
        const { getByPlaceholderText, getByTestId } = render(<Input name="email" placeholder="E-mail" />,)

        const inputElement = getByPlaceholderText('E-mail');
        const containerElement = getByTestId('input-container')

        fireEvent.change(inputElement, {
            target: { value: 'johndoe.example.com'}
        });

        fireEvent.blur(inputElement)

        await waitFor(() => expect(containerElement).toHaveStyle('color: #ff9000;'));
    });
});