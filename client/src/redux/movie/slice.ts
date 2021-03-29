import { createSlice } from "@reduxjs/toolkit";
import { IMovie, ISearchCondition } from "../../services/interface";

type IMovieCondition = Required<ISearchCondition>;

export interface IAction<T extends string, S> {
  type: T;
  payload: S;
}

interface ISaveDatas {
  movies: IMovie[];
  total: number;
}

export interface IChangeSwitchType {
  type: string;
  id: string;
  checked: boolean;
}

export interface IMovieState {
  datas: IMovie[];
  condition: IMovieCondition;
  total: number;
  isLoading: boolean;
  totalPage: number;
}

const initialState: IMovieState = {
  datas: [],
  condition: {
    page: 1,
    limit: 10,
    key: "",
  },
  /**
   * 目前的条数
   */
  total: 0,
  isLoading: false,
  totalPage: 0,
};

export const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    deleteMovie: (state, action: IAction<string, { id: string }>) => ({
      ...state,
      datas: state.datas.filter((item) => item._id !== action.payload.id),
      total: state.total - 1,
      totalPage: Math.ceil((state.total - 1) / state.condition.limit),
    }),
    setLoading: (state, action: IAction<string, { isLoaing: boolean }>) => ({
      ...state,
      isLoading: action.payload.isLoaing,
    }),
    saveMovies: (state, action: IAction<string, ISaveDatas>) => ({
      ...state,
      datas: [...state.datas, ...action.payload.movies] as IMovie[],
      total: action.payload.total,
      totalPage: Math.ceil(action.payload.total / state.condition.limit),
    }),
    setCondition: (state, action: IAction<string, ISearchCondition>) => {
      const newState = {
        ...state,
        condition: {
          page: action.payload.page ? action.payload.page : 1,
          limit: action.payload.limit ? action.payload.limit : 10,
          key: action.payload.key ? action.payload.key : "",
        },
      };
      newState.totalPage = Math.ceil(newState.total / newState.condition.limit);
      return {
        ...newState,
      };
    },
    saveSingleMovie: (state, action: IAction<string, { movie: IMovie }>) => ({
      ...state,
      datas: [...state.datas, action.payload.movie],
      total: state.total + 1,
      totalPage: Math.ceil((state.total + 1) / state.condition.limit),
    }),
    getSingleMovie: (state, action: IAction<string, { id: string }>) => state,
    getConditionMovies: (state) => state,
    transformAction: (state) => state,
    deleteOriginMovie: (state, action: IAction<string, { id: string }>) =>
      state,
    saveOriginMovie: (state, action: IAction<string, { movie: IMovie }>) =>
      state,
    setSwitchType: (state, action: IAction<string, IChangeSwitchType>) => {
      const newDatas = state.datas.map((item) => {
        const temp = Object.assign({}, item);
        if (temp._id === action.payload.id) {
          temp[action.payload.type] = action.payload.checked;
        }
        return temp;
      });
      return {
        ...state,
        datas: newDatas,
      };
    },
  },
});

export const { actions, reducer } = MovieSlice;
