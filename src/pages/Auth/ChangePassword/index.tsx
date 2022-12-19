import {useState} from 'react';
import { Button, Form, Input } from 'antd';

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store"
import { setUser } from "../../../store/userSlice";

import { Auth } from 'aws-amplify'

import "./styles.css";

import {IUser} from "../../../interfaces";

function ChangePassword() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    async function handleChangePassword() {
        if (loading) {
            return;
        }
        
        setLoading(true);
        
        let oldPassword = form.getFieldValue('password')
        let newPassword = form.getFieldValue('new-password')
        let confirmNewPassword = form.getFieldValue('confirm-new-password')

        if (newPassword !== confirmNewPassword) {
            setLoading(false);
            alert('A nova senha e a confirmação da nova senha não correspondem');
            return;
        }

        await Auth.signIn(form.getFieldValue('username'), oldPassword)
        .then(async (response) => {
            console.log("handleChangePassword ->", response.attributes);

            await Auth.changePassword(response, oldPassword, newPassword)
            .then(async (response) => {
                console.log("handleChangePassword ->", response);

                if (response === 'SUCCESS') {
                    alert('Senha alterada com sucesso');
                    await Auth.signOut()
                    .then(async (response) => {
                        console.log("handleChangePassword ->", response.attributes);
                        window.location.href = '/';
                        setLoading(false);
                        return;
                    })
                }

                console.log("handleChangePassword ->", 'Error 3');
                setLoading(false);
                alert('Não foi possível alterar a senha');
            })
            .catch(async() => {
                window.location.href = '/';
            });
        })
        .catch(async () => {
            setLoading(false);
            alert('Usuário ou senha incorretos');
        });

        setLoading(false);
    }

    async function setUserAsync(user : IUser) {
        dispatch(setUser(user));
    }

    return (
        <>
            <div className='container-change-password'>
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
                            rules={[{ required: true, message: 'Por favor, informe seu e-mail' }]}
                        >
                            <Input placeholder="E-mail" />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label="Senha Atual"
                            rules={[{ required: true, message: 'Por favor, informe a senha atual' }]}>
                            <Input.Password
                                placeholder="Senha Atual"
                                type="password"
                            />
                        </Form.Item>
                        <Form.Item
                            name='new-password'
                            label="Nova Senha"
                            rules={[{ required: true, message: 'Por favor, informe a nova senha' }]}>
                            <Input.Password
                                placeholder="Nova Senha"
                                type="password"
                            />
                        </Form.Item>
                        <Form.Item
                            name='confirm-new-password'
                            label="Confirmar Nova Senha"
                            rules={[{ required: true, message: 'Por favor, confirme a nova senha' }]}>
                            <Input.Password
                                placeholder="Confirmar Nova Senha"
                                type="password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button key="submit" type="primary" onClick={handleChangePassword} className="btn-change-password">
                                {loading ? "Carregando..." : "Alterar Senha"}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='link-account'>
                        <Link to="/">Entrar</Link>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ChangePassword;