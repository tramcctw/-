import { combineEpics } from "redux-observable";
import {
  getSingleMovie,
  getConditionMovie,
  deleteSingleMovie,
  saveOriginMovie,
  setOriginSwitchType,
  setEditMovie,
} from "./movie/effect";
import { login, register } from './login/effect'

const rootEpic = combineEpics(
  getSingleMovie,
  getConditionMovie,
  deleteSingleMovie,
  saveOriginMovie,
  setOriginSwitchType,
  setEditMovie,
  login,
  register
);

export default rootEpic;
