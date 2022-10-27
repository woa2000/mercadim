import React, { useState, useEffect } from "react";
import api from "../../services/api";


import { Link, useHistory } from "react-router-dom";

import "./styles.css";
import { Menu } from 'antd';

import { AiOutlineAppstore } from 'react-icons/ai';
import SearchItems from "../search/search";
import Cart from "../cart/cart";
import LoggedUser from "../loggedUser/loggedUser";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import CustomMenu from "./menu/customMenu";

interface Props {
    categoryName: string;
    active: boolean;
    onClick: (categoryName: string) => void;
}

function Header({ signOut }: any) {
    const [menuItens, setMenuItens] = useState([]);
    console.log("Header");
    const getItens = () => {
        api.get('/Depart/ListActiveDepart')
            .then(response => {
                setMenuItens(response.data);
                //return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    useEffect(() => {
        getItens();
    }, []);


    return (
        <div className="header-container" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="header">
                <div className="group-header">
                    <div className="logo">
                        <Link to="/">
                        <img src="logo-mercadim.png"></img>
                        </Link>
                    </div>
                    <SearchItems />
                    <LoggedUser />
                    <Cart />
                </div>
            </div>
            <div className="menu-container">
                <CustomMenu />
            </div>
        </div>

    )
}

export default Header;

