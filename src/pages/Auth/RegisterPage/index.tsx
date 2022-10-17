import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

import { useHistory, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store"
import { setUser } from "../../../store/userSlice";

import { Auth } from 'aws-amplify'

import "./styles.css";

import { IUser } from "../../../interfaces";

function RegisterPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const history = useHistory();

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
                    >
                        <Form.Item
                            name='name'
                            label="Nome"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Nome" />
                        </Form.Item>
                        <Form.Item
                            name='username'
                            label="E-mail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, informe seu e-mail',
                                },
                            ]}
                        >
                            <Input placeholder="E-mail" />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label="Senha"
                        >
                            <Input
                                placeholder="Senha"
                                type="password"
                            />
                        </Form.Item>
                        <Form.Item
                            name='confirmpassword'
                            label="Confirmar Senha"
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
                        >
                            <Input
                                placeholder="Confirmar Senha"
                                type="password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button key="submit" type="primary" onClick={handleRegister} className="btn-register" >
                                {loading ? "Registrando..." : "Registrar"}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <Link to="/">Acessar conta</Link>
                    </div>
                </div>

            </div >
        </>
    );
}

export default RegisterPage;