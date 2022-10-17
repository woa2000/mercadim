import React, {useEffect, useState} from "react";
import { connect } from "react-redux";

import "./styles.css";
import { Menu } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setActiveCategory, fetchProducts } from "../../../store/productsSlice";

import api from "../../../services/api"

interface Props {
    menuItens: any;
}

interface ItensMenu{
    id: string,
    name: string
}

function CustomMenu() {
    const dispatch = useDispatch<AppDispatch>();
    const [menuItens, setMenuItens] = useState<ItensMenu[]>([]);

    async function getDeparts() {
        try{
            const { data }= await api.get(`/Depart/ListActiveDepart`);
            return data;
   
       }catch(error : any){
           return error?.response;
       }
    }

    function handleSelectDepart(item: string) {
        dispatch(setActiveCategory("Todos"));  
        dispatch(fetchProducts(item));
    }

    useEffect(() => {
        getDeparts()
        .then((data) => {
            
            let itens: ItensMenu[] = [];
            data.forEach((item: any) => {
                itens.push({id: item.id, name: item.departName});
            });
            setMenuItens(itens);
            console.log("menu ->", menuItens);
        });
    }, []);


    return (
        <Menu
            theme="dark"
            mode="horizontal"
        >
            {menuItens.map((item) => (
                <Menu.Item key={item.id} onClick={() => handleSelectDepart(item.name)}>{item.name}</Menu.Item>
            ))}
               
            {/* <Menu.Item onClick={() => {handleSelectDepart("Alimentos")}} >Alimentos</Menu.Item> 
            <Menu.Item onClick={() => {handleSelectDepart("Bebidas")}} >Bebidas</Menu.Item>
            <Menu.Item onClick={() => {handleSelectDepart("Empresas")}} >Empresas</Menu.Item>
            <Menu.Item onClick={() => {handleSelectDepart("Guloseimas")}} >Guloseimas</Menu.Item>
            <Menu.Item onClick={() => {handleSelectDepart("Higiene")}} >Higiene</Menu.Item>
            <Menu.Item onClick={() => {handleSelectDepart("Limpeza")}} >Limpeza</Menu.Item>
            <Menu.Item onClick={() => {handleSelectDepart("Natureba")}} >Natureba</Menu.Item>
            <Menu.Item onClick={() => {handleSelectDepart("Utilidades")}} >Utilidades</Menu.Item> */}
        </Menu>
    )
}

export default CustomMenu;