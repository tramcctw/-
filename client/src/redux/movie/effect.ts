import { ofType } from "redux-observable";
import { from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { IMovie } from "../../services/interface";
import { MovieService } from "../../services/MovieService";
import { IAction } from "./slice";
import { appActions } from "../core";
import store, { IInitAppState } from "../index";
import { IChangeSwitchType } from "./slice";

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
      return from(MovieService.find(store.getState().movie.condition)).pipe(
        map((res) => {
          if (res.data) {
            return appActions.saveMovies({
              movies: res.data,
              total: (res as any).total,
            });
          }
          store.dispatch(appActions.setLoading({ isLoaing: false }));
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
            store.dispatch(
              appActions.saveSingleMovie({ movie: action.payload.movie })
            );
          } else {
            // 条件不满足
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
