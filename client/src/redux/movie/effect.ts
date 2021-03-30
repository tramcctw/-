import { ofType } from "redux-observable";
import { from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { IMovie } from "../../services/interface";
import { MovieService } from "../../services/MovieService";
import { IAction } from "./slice";
import { appActions } from "../core";
import store, { IInitAppState } from "../index";
import { IChangeSwitchType } from "./slice";
import { message } from "antd";

export const getSingleMovie = (action$) => {
  return action$.pipe(
    ofType(appActions.getSingleMovie),
    mergeMap((action: IAction<string, { id: string }>) => {
      store.dispatch(appActions.setLoading({ isLoaing: true }));
      return from(MovieService.getSingleData(action.payload.id)).pipe(
        map((res) => {
          store.dispatch(appActions.setLoading({ isLoaing: false }));
          return appActions.saveSingleMovie({
            movie: res.data as IMovie,
          });
        })
      );
    }),
    catchError((err) => {
      return [];
    })
  );
};

export const getConditionMovie = (actions$) => {
  return actions$.pipe(
    ofType(appActions.getConditionMovies),
    mergeMap((action: IAction<string, any>) => {
      store.dispatch(appActions.setLoading({ isLoaing: true }));
      const condition = store.getState().movie.condition;
      return from(MovieService.find(condition)).pipe(
        map((res) => {
          if (res.data) {
            setTimeout(() => {
              store.dispatch(
                appActions.saveMovies({
                  movies: res.data,
                  total: condition.key
                    ? (res as any).count
                    : (res as any).total,
                })
              );
              store.dispatch(appActions.setLoading({ isLoaing: false }));
            }, 500);
          }

          return appActions.transformAction();
        })
      );
    }),
    catchError((err) => {
      return [];
    })
  );
};

export const deleteSingleMovie = (action$) => {
  return action$.pipe(
    ofType(appActions.deleteOriginMovie),
    mergeMap((action: IAction<string, { id: string }>) => {
      store.dispatch(appActions.setLoading({ isLoaing: true }));
      return from(MovieService.delete(action.payload.id)).pipe(
        map((res) => {
          if (res.data === "success") {
            store.dispatch(appActions.deleteMovie({ id: action.payload.id }));
            message.success("删除成功!!");
          } else {
            // id无效
          }
          return appActions.setLoading({ isLoaing: false });
        })
      );
    }),
    catchError((err) => {
      return [];
    })
  );
};

export const saveOriginMovie = (action$) => {
  return action$.pipe(
    ofType(appActions.saveOriginMovie),
    mergeMap((action: IAction<string, { movie: IMovie }>) => {
      store.dispatch(appActions.setLoading({ isLoaing: true }));
      return from(MovieService.add(action.payload.movie)).pipe(
        map((res) => {
          if (!res.err) {
            setTimeout(() => {
              store.dispatch(
                appActions.saveSingleMovie({ movie: action.payload.movie })
              );
              store.dispatch(appActions.setLoading({ isLoaing: false }));
              message.success("添加成功...");
            }, 500);
          } else {
            // 条件不满足
            message.error("添加失败...");
          }
          return appActions.transformAction();
        })
      );
    }),
    catchError((err) => {
      return [];
    })
  );
};

export const setOriginSwitchType = (action$) => {
  return action$.pipe(
    ofType(appActions.setSwitchType),
    mergeMap((action: IAction<string, IChangeSwitchType>) => {
      const movieState: IInitAppState = store.getState();
      let movie = null;
      movieState.movie.datas.forEach((item) => {
        if (item._id === action.payload.id) {
          movie = item;
        }
      });
      return from(MovieService.edit(action.payload.id, movie)).pipe(
        map((res) => {
          return appActions.transformAction();
        })
      );
    })
  );
};

export const setEditMovie = (action$) => {
  return action$.pipe(
    ofType(appActions.editSingleMovie),
    mergeMap((action: IAction<string, { id: string; movie: IMovie }>) => {
      return from(
        MovieService.edit(action.payload.id, action.payload.movie)
      ).pipe(
        map((res) => {
          return appActions.transformAction();
        })
      );
    })
  );
};
