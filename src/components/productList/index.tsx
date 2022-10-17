import React, { useState, useEffect } from "react";

import Card from "../card";
import CategoryButton from "../categoryButton";

import './styles.css'

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setActiveCategory, fetchProducts } from "../../store/productsSlice";

import { Product } from "../../interfaces";

interface Props {
    departName: string;
}

interface Category {
    depart: string;
    category: string;
}

function ProductList({ departName }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const activatedCategory = useSelector((state: RootState) => state.products.activatedCategory);
    const categoryList = useSelector((state: RootState) => state.products.categoryList) as Category[];
    const products = useSelector((state: RootState) => state.products.products) as Product[];


    function handleCategorySelected(categoryName: string) {
        dispatch(setActiveCategory(categoryName));
    }

    useEffect(() => {
        dispatch(setActiveCategory("Todos"));
        dispatch(fetchProducts(departName));
    }, [])

    return (
        <>
            <div className="products-container">
                <div className="category-title">
                    <h2>{departName}</h2>
                </div>
                <div className="category-list">
                    <CategoryButton
                        key={"Todos"}
                        categoryName="Todos"
                        active={activatedCategory === "Todos"}
                        onClick={(categoryName) => { handleCategorySelected(categoryName) }}
                    />
                    {
                        categoryList.map((subCategoryName: Category, index) => (
                            <CategoryButton
                                key={subCategoryName.category}
                                categoryName={subCategoryName.category}
                                active={activatedCategory === subCategoryName.category}
                                onClick={(categoryName) => { handleCategorySelected(categoryName) }}
                            />
                        ))
                    }
                </div>
                {
                    categoryList.map((item, index) => (
                       
                        <div className={activatedCategory === item.category || activatedCategory === "Todos" ? "subcategory-group" : "subcategory-group hide"} >
                            <div className="category-title">
                                <h2>{item.category}</h2>
                            </div>

                            <div className="product-list">
                                {
                                    products.filter(product => product.subCategory === item.category).map((product, index) => (
                                        <Card
                                            key={product.id}
                                            id={product.id}
                                            description={product.description}
                                            price={product.price}
                                            markup={product.markup}
                                            markupPrice={product.markupPrice}
                                            quantity={product.quantity}
                                            subCategory={product.subCategory}
                                            url={product.url}                                            
                                        />
                                    ))
                                } 
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default ProductList;