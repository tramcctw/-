import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "./effect";
import { MovieSlice } from "./movie/slice";
import { IMovieState } from "./movie/slice";

export interface IInitAppState {
  movie: IMovieState;
}

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    movie: MovieSlice.reducer,
  },
  middleware: [epicMiddleware, logger],
});

epicMiddleware.run(rootEpic);

export default store;
