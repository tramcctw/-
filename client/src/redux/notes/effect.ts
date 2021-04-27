import { ofType } from "redux-observable";
import { from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { appActions } from '../core'
import { message } from "antd";
import { IAction } from '../movie/slice'
import NotesService from '../../services/NotesService'

export const addOriginContent = (action$) => {
    return action$.pipe(
        ofType(appActions.addOriginContent),
        mergeMap((action: IAction<string, { content: string }>) => {
            return from(NotesService.addContent(action.payload)).pipe(
                map((res) => {
                    if (res.data) {
                        message.success('添加成功！！')
                    }
                    return appActions.addContent(res.data)
                })
            );
        }),
        catchError((err) => {
            return [];
        })
    );
};

export const getAllContent = (action$) => {
    return action$.pipe(
        ofType(appActions.getAllContent),
        mergeMap((action) => {
            return from(NotesService.getAllContent()).pipe(
                map((res) => {
                    return appActions.setAllContent(res.data)
                })
            );
        }),
        catchError((err) => {
            return [];
        })
    );
};

export const deleteContent = (action$) => {
    return action$.pipe(
        ofType(appActions.deleteContent),
        mergeMap((action: IAction<string, { id: string }>) => {
            return from(NotesService.deleteContent(action.payload.id)).pipe(
                map((res) => {
                    if (res.err === null) {
                        message.success('删除成功！！')
                    }
                    return appActions.getAllContent()
                })
            );
        }),
        catchError((err) => {
            return [];
        })
    );
};