import React from "react";
import "./styles.css";

import { CartItem } from "../../interfaces";

function ItemCheckout({ id, item, quantity }: CartItem) {
    return (
        <>
            <div className="row-item">
                <div className="col-1">
                    <div className="group-img">
                        <img src={item.url} />
                    </div>
                    <div className="group-info">
                        <span className="name">{item.description}</span>
                    </div>
                </div>
                <div className="col-2">
                    <div className="group-quantity">
                        {quantity}
                    </div>
                </div>
                <div className="col-3">
                    <div className="group-price">
                        {item.markupPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </div>
                </div>
                <div className="col-4">
                    <div className="group-total">
                        {(item.markupPrice * quantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemCheckout;