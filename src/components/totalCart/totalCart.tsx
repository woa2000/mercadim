import React from "react";
import "./styles.css";

import {CartItem} from "../../interfaces";

interface Props {
    itens: CartItem[];
}

function TotalCart({itens} : Props) {
    let total = 0.00 as number;
    itens.map((item: CartItem) => {
        total = (total + (item.item.markupPrice * item.quantity));
    });

    return (
        <>
            <div className="box-total">
                <span className="label">TOTAL DA COMPRA</span>
                <span className="total">{total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
            </div>
        </>
    )
}

export default TotalCart;