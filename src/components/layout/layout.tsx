import React from "react";
import "./styles.css";

import { Provider, useSelector } from 'react-redux';
import { store } from '../../store/index';

import { Layout } from 'antd';
import Header from '../header/header';


const { Content } = Layout;

interface Props {
    children: React.ReactNode;
    singOut: any;
}

function CustomLayout({ children, singOut }: Props) {

    return (
        <Layout className="layout">
            <Provider store={store}>
              <Header 
                singOut={singOut}
              />
              <Content className="site-layout" style={{ padding: '0 50px', marginTop: 140 }}>
                {children}
              </Content>
            </Provider>
        </Layout>
    );
}

export default CustomLayout;