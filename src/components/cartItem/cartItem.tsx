import React from "react";
import ProductCounter from '../productCounter'

import "./styles.css";

import { CartItem } from "../../interfaces";

function CardCartItem(cartItem : CartItem) {
  return (
    <div className="cart-item">
      <div className="group-image">
        <img src={cartItem.item.url}/>
      </div>
      <div className="group-cart-item-info">
        <div className="name">{cartItem.item.description}</div>
        <div className="cart-item-details">
            <div className="price">{cartItem.item.markupPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
            <ProductCounter 
              key={cartItem.id}
              id={cartItem.id}
              userid={cartItem.userid}
              item={cartItem.item}
              quantity={cartItem.quantity}
            />
        </div>
      </div>
    </div>
  );
}

export default CardCartItem;