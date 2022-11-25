import React, {useState} from 'react';
import { Button, Form, Input } from 'antd';

import { useHistory, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store"
import { setUser } from "../../../store/userSlice";

import { Auth } from 'aws-amplify'

import "./styles.css";

import {IUser} from "../../../interfaces";

function LoginPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const history = useHistory();

    async function handleLogin() {
        if (loading) {
            return;
        }
        setLoading(true);
        try{
            await Auth.signIn(form.getFieldValue('username'), form.getFieldValue('password'))
            .then((response) => {
                console.log("handleLogin ->", response.attributes);
                const user = {userId : response.attributes.sub, email : response.attributes.email, name : response.attributes.email} as IUser ;
                setUserAsync(user).then(() => {
                    window.location.reload();
                });
            });
            setLoading(false);
        }catch(e){
            setLoading(false);
            alert('Usuário ou senha incorretos');
        }        
    }

    async function setUserAsync(user : IUser) {
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
                                },
                            ]}
                        >
                            <Input placeholder="E-mail" />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label="Senha">
                            <Input.Password
                                placeholder="Senha"
                                type="password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button key="submit" type="primary" onClick={handleLogin} className="btn-login">
                                {loading ? "Carregando..." : "Entrar"}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='link-account'>
                        <Link to="/signup">Criar conta</Link>
                    </div>
                </div>

            </div>
        </>
    );
}

export default LoginPage;