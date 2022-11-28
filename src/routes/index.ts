import React from "react";

import Home from "../pages/Home";
import Checkout from "../pages/CheckoutPage";
import BackOffice from "../pages/BackOffice";


import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ConfirmRegisterPage from "../pages/Auth/ConfirmRegisterPage";


const userRoutes = [
    { path: "/", component: Home },
    { path: "/checkout", component: Checkout },
    { path: "/backoffice", component: BackOffice }
];

const adminRoutes = [
    { path: "/", component: Home },
    { path: "/checkout", component: Checkout },
    { path: "/backoffice", component: BackOffice }
];


const authRoutes = [
    { path: "/", component: LoginPage },
    { path: "/signup", component: RegisterPage },
    { path: "/confirm-register", component: ConfirmRegisterPage },
];

const backofficeRoutes = [

];

export  {adminRoutes, userRoutes, authRoutes};