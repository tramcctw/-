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
import { getAllContent, addOriginContent, deleteContent } from './notes/effect'

const rootEpic = combineEpics(
  getSingleMovie,
  getConditionMovie,
  deleteSingleMovie,
  saveOriginMovie,
  setOriginSwitchType,
  setEditMovie,
  login,
  register,
  getAllContent,
  addOriginContent,
  deleteContent
);

export default rootEpic;
