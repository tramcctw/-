import { createSlice } from "@reduxjs/toolkit";
import { IAction } from "../movie/slice";
import { INotes } from "../../services/interface"


export interface INotesState {
    data: INotes[]
}

const initialState: INotesState = {
    data: []
}

export const NotesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addOriginContent: (state, action: IAction<string, { content: string }>) => ({ ...state }),
        addContent: (state, action: IAction<string, { content: string }>) => {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        },
        deleteContent: (state, action: IAction<string, { id: string }>) => ({ ...state }),
        getAllContent: (state) => ({ ...state }),
        setAllContent: (state, action: IAction<string, INotes[]>) => {
            return { ...state, data: action.payload }
        }
    }
})

export const { actions, reducer } = NotesSlice;