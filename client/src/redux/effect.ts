import { combineEpics } from "redux-observable";
import {
  getSingleMovie,
  getConditionMovie,
  deleteSingleMovie,
  saveOriginMovie,
} from "./movie/effect";

const rootEpic = combineEpics(
  getSingleMovie,
  getConditionMovie,
  deleteSingleMovie,
  saveOriginMovie
);

export default rootEpic;
