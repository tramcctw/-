import { Dispatch } from "redux";
import { actions as movieActions } from "../movie/slice";
import { actions as loginActions } from '../login/slice'
import { actions as notesAtions } from '../notes/slice'

export const appActions = {
  ...movieActions,
  ...loginActions,
  ...notesAtions
};

export function appMapDispatchProps(dispatch: Dispatch) {
  const appDispatch = {};
  for (let props in appActions) {
    appDispatch[props] = (condition: any) => {
      dispatch(appActions[props](condition));
    };
  }
  return appDispatch;
}
