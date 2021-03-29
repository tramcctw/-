import { combineEpics } from "redux-observable";
import {
  getSingleMovie,
  getConditionMovie,
  deleteSingleMovie,
  saveOriginMovie,
  setOriginSwitchType,
} from "./movie/effect";

const rootEpic = combineEpics(
  getSingleMovie,
  getConditionMovie,
  deleteSingleMovie,
  saveOriginMovie,
  setOriginSwitchType
);

export default rootEpic;
