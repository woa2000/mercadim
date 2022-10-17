import React from 'react';

export interface Depart {
    id: string;
    departName: string;
    markup: number;
    active: boolean;
}

export interface Category {
    id: string;
    departName: string;
    categoryName: string;
    markup: number;
    active: boolean;
}

export interface Product {
    id: string;
    description: string;
    price: number;
    markup: number;
    markupPrice: number;
    quantity: number;
    category?: string;
    subCategory: string;
    url: string;
}

export interface CartItem {
    id: string;
    userid: string
    item: Product
    quantity: number
}

export interface ChangeCartItem{
    itemId: string;
    quantity: number;
}

export interface IUser{
    userId: string;
    name: string;
    email: string;
}
  