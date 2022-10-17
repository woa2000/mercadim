import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

import { useHistory, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store"
import { setUser } from "../../../store/userSlice";

import { Auth } from 'aws-amplify'

import "./styles.css";

import { IUser } from "../../../interfaces";

function ConfirmRegisterPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const history = useHistory();

    async function handleRegister() {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            await Auth.confirmSignUp(form.getFieldValue('username'), form.getFieldValue('code'))
                .then((response) => {
                    console.log("handleConfirm ->", response);
                    if (response === 'SUCCESS') {
                        history.push('/');
                    } else {
                        alert('Opps..., Favor confirmar o código verificação e tentar novamente.');
                    }
                });
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log("handleRegister error ->", e);
            alert('Opps..., Ocorreu um erro ao tentar confirmar seu cadastro.');
        }
    }


    async function handleResend() {
        if (loadingResend) {
            return;
        }
        setLoadingResend(true);
        try {
            await Auth.resendSignUp(form.getFieldValue('username'))
                .then((response) => {
                    console.log("handleConfirm ->", response);
                    alert('Código de confirmação reenviado com sucesso.');
                });
            setLoadingResend(false);
        } catch (e) {
            setLoadingResend(false);
            console.log("handleRegister error ->", e);
            alert('Opps..., Ocorreu um erro ao tentar confirmar seu cadastro.');
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
                            name='code'
                            label="Código de Verificação"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="Digite o código de verificação" />
                        </Form.Item>
                        <Form.Item>
                            <Button key="submit" type="primary" onClick={handleRegister} className="btn-confirm">
                                {loading ? "Confirmando..." : "Confirmar"}
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button key="submit" type="default" onClick={handleResend} className="btn-confirm">
                                {loading ? "Enviando..." : "Reenviar Código"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div >
        </>
    );
}

export default ConfirmRegisterPage;