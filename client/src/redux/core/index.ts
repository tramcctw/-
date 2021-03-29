import { Dispatch } from "redux";
import { actions } from "../movie/slice";

export const appActions = {
  ...actions,
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
