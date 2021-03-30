import { combineEpics } from "redux-observable";
import {
  getSingleMovie,
  getConditionMovie,
  deleteSingleMovie,
  saveOriginMovie,
  setOriginSwitchType,
  setEditMovie,
} from "./movie/effect";

const rootEpic = combineEpics(
  getSingleMovie,
  getConditionMovie,
  deleteSingleMovie,
  saveOriginMovie,
  setOriginSwitchType,
  setEditMovie
);

export default rootEpic;
