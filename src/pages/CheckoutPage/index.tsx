import React from "react";
import "./styles.css";

import { useHistory } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { createOrder, sendOrder, fetchCart } from "../../store/cartSlice";

import ItemCheckout from "../../components/itemCheckout/itemCheckout";

import { CartItem } from "../../interfaces";
import TotalCart from "../../components/totalCart/totalCart";

function Ckeckout() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const userId = useSelector((state: RootState) => state.user.userId);
    const userName = useSelector((state: RootState) => state.user.name);
    const userEmail = useSelector((state: RootState) => state.user.email);

    const history = useHistory();

    const dispatch = useDispatch<AppDispatch>();

    function handleGoBackShopping() {
        history.push("/");
    }

    function handleCloseOrder() {
        dispatch(createOrder(userId))
            .then((data) => {
                const sendOrderData = {OrderId : data.payload.value.modelResult.newEntityId, UserEmail: userEmail, UserName: userName};
                dispatch(sendOrder(sendOrderData));
                alert("Pedido realizado com sucesso. Em breve você receberá informações seu pedido.");
                dispatch(fetchCart(userId)).then(() => {
                    history.push("/");
                });
            })
    }

    return (
        <div className="container-checkout">
            <div className="content">
                <div className="group-buttons">
                    <button className="btn-mais-itens" onClick={handleGoBackShopping}>Escolher mais produtos</button>
                    <button className="btn-confirmar-compra" onClick={handleCloseOrder}>Confirmar Compra</button>
                </div>
                <div className="row-total">
                    <TotalCart
                        itens={cartItems}
                    />
                </div>
                <div className="row-itens">
                    <div className="header-table">
                        <div className="col-1">Produto</div>
                        <div className="col-2">Quantidade</div>
                        <div className="col-3">Preço</div>
                        <div className="col-4">Valor Total</div>
                    </div>
                    <div className="body-table">
                        {
                            cartItems != undefined &&
                            cartItems.map((item: CartItem) => {
                                return (
                                    <ItemCheckout
                                        key={item.id}
                                        id={item.id}
                                        item={item.item}
                                        quantity={item.quantity}
                                        userid={item.userid}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="group-buttons">
                    <button className="btn-mais-itens" onClick={handleGoBackShopping}>Escolher mais produtos</button>
                    <button className="btn-confirmar-compra" onClick={handleCloseOrder}>Confirmar Compra</button>
                </div>
            </div>
        </div>
    )
}

export default Ckeckout;