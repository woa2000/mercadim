import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { useSelector, useDispatch } from "react-redux";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import type { AppDispatch } from "."

import api from "../services/api"
import {CartItem, Product} from "../interfaces"

export const addCartItem = createAsyncThunk('cart/add', async ({userid, item} : CartItem, {rejectWithValue, getState, dispatch}) => {
    try{
         const { data } = await api.post(`/Cart/AddCartItem/${item.id}/${userid}`)
         return {modelResult: data.value.modelResult, item: item};

    }catch(error : any){
        return error?.response;
    }
})

function UpdateCartItems( item : Product, quantity : number) : CartItem[] {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems) as any;
    console.log( "before updateCartItems =>",cartItems);

    const itemIndex = cartItems.findIndex((cartItem : CartItem) => cartItem.item.id === item.id);
    if(itemIndex > -1){
        const cartItem = cartItems[itemIndex];
        cartItem.quantity = quantity;
        cartItems[itemIndex] = cartItem;
    }else{
        cartItems.push({id: "", userid: "", item: item, quantity: quantity});
    }
    console.log( "updateCartItems =>",cartItems);
    return cartItems;
}

const cartItem = createSlice({
    name: "cartItem",
    initialState: {
        loading: false,
        error: "",
        userId: "4A3B8760-C564-4F18-A89D-97CA3802C460",
        showCart: false,
        cartItems: [] as CartItem[],
    },
    reducers: {
        displayCart: (state) => {
            state.showCart = !state.showCart;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addCartItem.fulfilled, (state, action) => {
            console.log("addCartItem.fulfilled");
            console.log("action.payload ->",action.payload);
            const {success, newEntityId} = action.payload.modelResult;
            const {item} = action.payload;

            if(success === true)
            {
                const itens = UpdateCartItems(item, 1);
                console.log("sucesso! ", newEntityId);
            }
            state.loading = false;
        })
        builder.addCase(addCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(addCartItem.pending, (state, action) => {
            state.loading = true;
        })
    }
})

export const {displayCart} = cartItem.actions
export default cartItem.reducer