import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { userRoutes, authRoutes, adminRoutes } from './routes';

import { Spin } from 'antd';

import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';

import CustomLayout from './components/layout/layout';

import { Amplify, Auth, Hub } from 'aws-amplify'
import { HubCallback } from '@aws-amplify/core/lib/Hub'
import '@aws-amplify/ui/dist/style.css';

import { Provider, useDispatch } from "react-redux";
import { AppDispatch, RootState, store } from "./store"
import { setUser } from "./store/userSlice";

import awsconfig from './aws-exports';

import { IUser } from "./interfaces";

Amplify.configure(awsconfig);


function App(user: IUser) {
  const dispatch = useDispatch<AppDispatch>();
  console.log("App ->", user);
  const [userId, setUserId] = useState(user.userId);
  const [email, setEmail] = useState(user.email);
  const [loggedIn, setLoggedIn] = useState(null) as any;

  // const checkUser = async () => {
  //   console.log("checkUser ->", user);
  //   const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
  //   const { attributes } = authUser;
  //   dispatch(setUser({userId: attributes.sub, email: attributes.email, name: attributes.name} as IUser));
  //   setUserId(attributes.sub);
  // }

  //checkUser();

  const accessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
      .then((authUser) => {
        const { attributes } = authUser;
        dispatch(setUser({ userId: attributes.sub, email: attributes.email, name: attributes.name } as IUser));
        setUserId(attributes.sub);
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
      })
  }

  const authListener: HubCallback = ({ payload: { event, data } }) => {
    console.log('authListener', event, data)
    switch (event) {
      case 'signIn':
        const { attributes } = data;
        dispatch(setUser({ userId: attributes.sub, email: attributes.email, name: attributes.email } as IUser));
        setUserId(attributes.sub);
        break;
      case 'signOut':
        setUserId("");
        window.location.reload();
        break;
    }
  }

  async function signOut() {
    console.log('signOut')
    try {
      await Auth.signOut()
        .then((response) => {
          dispatch(setUser({ userId: "", email: "", name: "" } as IUser));
          window.location.reload();
        })
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  useEffect(() => {
    accessLoggedInState();
  }, [])

  useEffect(() => {
    Hub.listen('auth', authListener)
    return () => Hub.remove('auth', authListener)
  }, [])

  function Loader() {
    return (
      <div>Loading ...</div>
    );
  }

  function RenderAdminRoutes() {
    return (
      <Router>
        <CustomLayout
          singOut={signOut}
        >
          <Switch>
            {adminRoutes.map((r, idx) => (
              <Route key={idx} exact path={r.path} component={r.component} />
            ))}
          </Switch>
        </CustomLayout>
      </Router>
    )
  }

  function RenderUserRoutes() {
    return (
      <Router>
        <CustomLayout
          singOut={signOut}
        >
          <Switch>
            {userRoutes.map((r, idx) => (
              <Route key={idx} exact path={r.path} component={r.component} />
            ))}
          </Switch>
        </CustomLayout>
      </Router>
    )
  }

  function RenderAuthRoutes() {
    return (
      <Router>
        <Switch>
          {authRoutes.map((r, idx) => (
            <Route key={idx} exact path={r.path} component={r.component} />
          ))}
        </Switch>
      </Router>
    )
  }

  return loggedIn != null ? 
      ( userId != null ? 
         email == 'woa2000@gmail.com' || email == 'romuloaugustoromani@gmail.com' || email == 'baseggiocarol0@gmail.com' ? RenderAdminRoutes() : RenderUserRoutes() 
        : RenderAuthRoutes() ) 
    : Loader();
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App
        userId={store.getState().user.userId}
        email={store.getState().user.email}
        name={store.getState().user.name}
      />
    </Provider>
  )
}

export default (AppWrapper);
