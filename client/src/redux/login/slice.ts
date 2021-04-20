import { createSlice } from "@reduxjs/toolkit";
import { IAction } from "../movie/slice";

export interface IChangeLoginState {
    isLogin: boolean,
}

export interface IChangeRegisterState {
    isRegister: boolean,
}

export interface ILoginState {
    isLogin: boolean;
    isRegister: boolean;
}

const initialState: ILoginState = {
    isLogin: false,
    isRegister: false
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => state,
        register: (state, action) => state,
        changeLoginState: (state, action: IAction<string, IChangeLoginState>) => {
            return {
                ...state,
                isLogin: action.payload.isLogin
            }
        },
        changeRegisterState: (state, action: IAction<string, IChangeRegisterState>) => {
            return {
                ...state,
                isRegister: action.payload.isRegister
            }
        }
    }
})

export const { actions, reducer } = loginSlice;