import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined } from '@ant-design/icons';

import { Link, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { displayCart, fetchCart } from "../../store/cartSlice";

import CardCartItem from "../cartItem/cartItem";
import "./styles.css";

import { CartItem } from "../../interfaces";

function Cart() {
    const showCart = useSelector((state: RootState) => state.cart.showCart);
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const userId = useSelector((state: RootState) => state.user.userId);

    console.log("cart items =>", cartItems);

    const history = useHistory();

    let total = 0.00 as number;

    const dispatch = useDispatch<AppDispatch>();

    function handleViewCart() {
        dispatch(displayCart());
    }

    function handleCheckout() {
        dispatch(displayCart());
        history.push("/checkout");
    }

    useEffect(() => {
        dispatch(fetchCart(userId));
        total = 0.00;
    }, [])

    return (
        <div className="cart-container">
            <div className="group-cart-button">
                {
                    cartItems != undefined &&
                        cartItems.length > 0 ? (
                        <div className="bullet">{cartItems.length}</div>
                    ) : (
                        <></>
                    )
                }
                <div className="cart-button" onClick={handleViewCart}>
                    <ShoppingCartOutlined />
                </div>
            </div>
            <div className={showCart != true ? "cart-list" : "cart-list show"}>
                <div className="close-cart">
                    <button className="close" onClick={() => handleViewCart()}>
                        <p className="text-close">X</p>
                    </button>
                </div>
                <div className="item-list">
                    {
                        cartItems != undefined &&
                        cartItems.map((item: CartItem) => {
                            total = (total + (item.item.markupPrice * item.quantity));
                            return (
                                <CardCartItem
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
                <div className="group-total">
                    <div className="total">Total: <span>{total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span></div>
                </div>
                <div className="checkout">
                    <button className="btn-checkout" onClick={() => { handleCheckout(); }}>
                        Finalizar compra
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Cart;