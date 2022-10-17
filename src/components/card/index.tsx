import React from "react"
import './styles.css'

import ProductCounter from '../productCounter'
import {Product, CartItem} from '../../interfaces'

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";

function Card(product: Product) {
    const userId = useSelector((state: RootState) => state.user.userId);

    return (
        <>
            <div className="card-container">
                <div className="mask-group">
                    <img className="img-1" src={product.url} />
                </div>
                <div className="details">
                    <div className="text">
                        <p className="text-2">{product.description}</p>
                        <p className="text-3">{product.markupPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                    </div>
                    <ProductCounter
                        key={product.id}
                        id=""
                        userid={userId}
                        item={product}
                        quantity={0}
                    />
                </div>
            </div>
        </>
    );
}

export default Card;




