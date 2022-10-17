import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import type { AppDispatch } from "."

import api from "../services/api"
import { CartItem, Product, ChangeCartItem } from "../interfaces"


export const fetchCart = createAsyncThunk('cart/list', async (userId: string, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await api.get(`/Cart/ListCart/${userId}`);
        return data;

    } catch (error: any) {
        console.log("error", error);
        return error?.response;
    }
})

export const addCartItem = createAsyncThunk('cart/add', async ({ userid, item }: CartItem, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await api.post(`/Cart/AddCartItem/${item.id}/${userid}`)
        return { modelResult: data.value.modelResult, item: item };

    } catch (error: any) {
        return error?.response;
    }
})

export const increaseCartItem = createAsyncThunk('cart/increase', async ({ itemId, quantity }: ChangeCartItem, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await api.post(`/Cart/IncreaseCartItem/${itemId}`)
        return { modelResult: data.value.modelResult, itemId: itemId, quantity: quantity };

    } catch (error: any) {
        return error?.response;
    }
})

export const decreaseCartItem = createAsyncThunk('cart/decrease', async ({ itemId, quantity }: ChangeCartItem, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await api.post(`/Cart/DecreaseCartItem/${itemId}`)
        return { modelResult: data.value.modelResult, itemId: itemId, quantity: quantity };

    } catch (error: any) {
        return error?.response;
    }
})

export const removeCartItem = createAsyncThunk('cart/remove', async (itemId : string, { rejectWithValue, getState, dispatch }) => {
    try {
        const { data } = await api.delete(`/Cart/RemoveCartItem/${itemId}`)
        return { removed: data, itemId: itemId};

    } catch (error: any) {
        return error?.response;
    }
})

export const createOrder = createAsyncThunk('order/createOrder', async (userId: string, { rejectWithValue, getState, dispatch }) => {    
    try {
        console.log("createOrder", userId);
        const {data} = await api.post(`/Order/CreateOrder/${userId}`)
        console.log("createOrder", data);
        return data;

    } catch (error: any) {
        return error?.response;
    }
})


function UpdateCartItems(cartItems: CartItem[], id: string, userId: string, item: Product, quantity: number): CartItem[] {
    const itemIndex = cartItems.findIndex((cartItem: CartItem) => cartItem.id === id);
    if (itemIndex > -1) {
        const cartItem = cartItems[itemIndex];
        cartItem.quantity = quantity;
        cartItems[itemIndex] = cartItem;
    } else {
        cartItems.push({ id: id, userid: userId, item: item, quantity: quantity });
    }
    return cartItems;
}

function RemoveCartItems(cartItems: CartItem[], id: string): CartItem[] {
    const itemIndex = cartItems.findIndex((cartItem: CartItem) => cartItem.id === id);
    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
    } 
    return cartItems;
}


const cart = createSlice({
    name: "cart",
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
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            const cartItems = action.payload;
            state.cartItems = cartItems;
            state.loading = false;
        })
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(fetchCart.pending, (state, action) => {
            state.loading = true;
        })

        builder.addCase(addCartItem.fulfilled, (state, action) => {
            const { success, newEntityId } = action.payload.modelResult;
            const { item } = action.payload;
            if (success === true) {
                const { cartItems } = state;
                const itens = UpdateCartItems(cartItems, newEntityId as string, state.userId, item, 1);
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

        builder.addCase(increaseCartItem.fulfilled, (state, action) => {
            const { success, newEntityId } = action.payload.modelResult;
            const { itemId, quantity } = action.payload;
            if (success === true) {
                const { cartItems } = state;
                const itens = UpdateCartItems(cartItems, itemId as string, state.userId, {} as Product, quantity + 1);
            }
            state.loading = false;
        })
        builder.addCase(increaseCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(increaseCartItem.pending, (state, action) => {
            state.loading = true;
        })

        builder.addCase(decreaseCartItem.fulfilled, (state, action) => {
            const { success, newEntityId } = action.payload.modelResult;
            const { itemId, quantity } = action.payload;
            if (success === true) {
                const { cartItems } = state;
                const itens = UpdateCartItems(cartItems, itemId as string, state.userId, {} as Product, quantity - 1);
            }
            state.loading = false;
        })
        builder.addCase(decreaseCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(decreaseCartItem.pending, (state, action) => {
            state.loading = true;
        })

        builder.addCase(removeCartItem.fulfilled, (state, action) => {
            const { removed, itemId } = action.payload;
            if (removed === true) {
                const { cartItems } = state;
                const itens = RemoveCartItems(cartItems, itemId as string);
            }
            state.loading = false;
        })
        builder.addCase(removeCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(removeCartItem.pending, (state, action) => {
            state.loading = true;
        })

        builder.addCase(createOrder.fulfilled, (state, action) => {
            const { data } = action.payload;
            console.log("createOrder.fulfilled ->",action.payload);
            state.loading = false;
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(createOrder.pending, (state, action) => {
            state.loading = true;
        })
    }
})




export const { displayCart } = cart.actions
export default cart.reducer