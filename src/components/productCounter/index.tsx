import React, { useState } from "react";

import './styles.css'
import { CartItem, ChangeCartItem } from '../../interfaces'



import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";

import { addCartItem, increaseCartItem, decreaseCartItem, removeCartItem } from "../../store/cartSlice";


function ProductCounter({ id, item }: CartItem) {
    const userId = useSelector((state: RootState) => state.user.userId) as string;
    const cartItems = useSelector((state: RootState) => state.cart.cartItems) as any;
    const dispatch = useDispatch<AppDispatch>();

    function handleAddCartItem() {
        const cartItem = { userid: userId, item: item } as CartItem;
        dispatch(addCartItem(cartItem));
    }

    function handleIncrement(itemId: string, quantity: number) {
        const changeCartItem = { itemId: itemId, quantity: quantity } as ChangeCartItem;
        dispatch(increaseCartItem(changeCartItem));
    }

    function handleDecrement(itemId: string, quantity: number) {
        if (quantity > 1) {
            const changeCartItem = { itemId: itemId, quantity: quantity } as ChangeCartItem;
            dispatch(decreaseCartItem(changeCartItem));
        }else{
            dispatch(removeCartItem(itemId));
        }
    }

    const itemIndex = cartItems.findIndex((cartitem: CartItem) => cartitem.item.id === item.id);
    
    return (
        // quantityInCart > 0 ? (
        (itemIndex > -1) ? (        
            <>
                <div className="input">
                    <button className="remove" onClick={() => handleDecrement(cartItems[itemIndex].id, cartItems[itemIndex].quantity)}>
                        <p className="text-remove">-</p>
                    </button>
                    <div className="quantity">
                        <div className="rectangle-1">
                            <p className="text-quantity">{cartItems[itemIndex].quantity}</p>
                        </div>
                    </div>
                    <button className="add" onClick={() => handleIncrement(cartItems[itemIndex].id, cartItems[itemIndex].quantity)}>
                        <p className="text-add">+</p>
                    </button>
                </div>
            </>
        ) :
            (
                <>
                    <button className="button" onClick={() => handleAddCartItem()}>
                        <p className="text-btn-add">Adicionar</p>
                    </button>
                </>
            )


    )

}

export default ProductCounter;