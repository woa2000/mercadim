import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import type { AppDispatch } from "."

import api from "../services/api"

export const fetchProducts = createAsyncThunk('products/list', async (departName : string, {rejectWithValue, getState, dispatch}) => {
    try{
         console.log( "departName in fetch =>", departName);
         const { data }= await api.get(`/Itens/ListItensDepart/${departName}`);
         console.log( "data in fetch =>", data);
         return data;

    }catch(error : any){
        return error?.response;
    }
})

const products = createSlice({
    name: "products",
    initialState: {
        loading: false,
        error: "",
        departName: "Alimentos",
        activatedCategory: "Todos",
        categoryList: [],
        products: [],
    },
    reducers: {
        setActiveCategory: (state, action) => {    
            state.activatedCategory = action.payload
        },        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            const {depart, categories , products }= action.payload;
            state.departName = depart;
            state.categoryList = categories
            state.products = products

            state.loading = false;
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
        })

    }
})

export const {setActiveCategory} = products.actions;


export default products.reducer