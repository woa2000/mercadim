import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

import { useHistory, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store"
import { setUser } from "../../../store/userSlice";

import { Auth } from 'aws-amplify'

import * as Yup from 'yup';

import "./styles.css";

import { IUser } from "../../../interfaces";

function RegisterPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const history = useHistory();

    validationSchema: Yup.object({
        username: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmpassword:
            Yup.string()
                .required('Password confirmation is required')
                .oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    async function handleRegister() {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            await Auth.signUp({ username: form.getFieldValue('username'), password: form.getFieldValue('password'), attributes: { email: form.getFieldValue('username'), name: form.getFieldValue('name') } })
                .then((response) => {
                    console.log("handleRegister ->", response);
                });
            alert('Cadastro realizado com sucesso, favor confirmar o código de verificação enviado para seu e-mail.');
            history.push('/confirm-register');
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log("handleRegister error ->", e);
            
            if (String(e).trim() === "UsernameExistsException: An account with the given email already exists.")
                alert('Já existe uma conta com o e-mail fornecido');
            else
                alert('Opps..., Ocorreu um erro ao tentar logar');
        }
    }

    async function setUserAsync(user: IUser) {
        dispatch(setUser(user));
    }

    return (
        <>
            <div className='container-login'>
                <div className='box'>
                    <div className="logo">
                        <img src="logo-mercadim.png" alt="logo mercadim" />
                    </div>
                    <Form
                        layout='vertical'
                        form={form}
                        onFinish={handleRegister}
                        autoComplete="off"
                    >
                        <Form.Item
                            name='name'
                            label="Nome"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, informe seu nome',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="Nome" />
                        </Form.Item>
                        <Form.Item
                            name='username'
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Por favor, informe um e-mail válido',
                                  },
                                {
                                    required: true,
                                    message: 'Por favor, informe seu e-mail',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder="E-mail" />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label="Senha"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, informe uma senha',
                                },
                                { 
                                    min: 6,
                                    message: 'A senha deve ter no mínimo 6 caracteres' 
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder="Senha"
                                type="password"
                            />
                        </Form.Item>
                        <Form.Item
                            name='confirmpassword'
                            label="Confirmar Senha"
                            dependencies={["password"]}
                            rules={[
                                { required: true, message: 'Por favor, confirme sua senha' },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('As senhas não conferem');
                                    }
                                })
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder="Confirmar Senha"
                                type="password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button key="submit" type="primary" className="btn-register" htmlType="submit">
                                {loading ? "Registrando..." : "Registrar"}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='link-account'>
                        <Link to="/">Acessar conta</Link>
                    </div>
                </div>

            </div >
        </>
    );
}

export default RegisterPage;