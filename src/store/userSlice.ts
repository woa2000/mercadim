import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import type { AppDispatch } from "."

import {Auth } from 'aws-amplify'

import api from "../services/api"

import { IUser } from "../interfaces"
import { getuid } from "process"

export const logout = createAsyncThunk('user/logout', async (userId: string, { rejectWithValue, getState, dispatch }) => {
    try {
        await Auth.signOut();
        return { loggedOut: true };
    } catch (error) {
        return error;
    }
})

const user = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: "",
        userId: null as any,
        name: "",
        email: "",
    },
    reducers: {
        setUser : (state, action: PayloadAction<IUser>) => {
            console.log("setUser", action.payload)
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.email = action.payload.email;
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state, action) => {
            console.log("logout ", action.payload);
            state.loading = false;
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true;
        })

    }
})

export const { setUser } = user.actions
export default user.reducer