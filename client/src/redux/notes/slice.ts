import { createSlice } from "@reduxjs/toolkit";
import { IAction } from "../movie/slice";

export interface INotesState {
    contents: string[]
}

const initialState: INotesState = {
    contents: []
}

const NotesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addContent: (state) => ({ ...state }),
        deleteContent: (state) => ({ ...state }),
        getAllContent: (state) => ({ ...state })
    }
})

export const { actions, reducer } = NotesSlice;