import { ofType } from "redux-observable";
import { from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { appActions } from '../core'
import { message } from "antd";
import { IAction } from '../movie/slice'
import NotesService from '../../services/NotesService'

export const addContent = (action$) => {
    return action$.pipe(
        ofType(appActions.addContent),
        mergeMap((action: IAction<string, { content: string }>) => {
            return from(NotesService.addContent(action.payload)).pipe(
                map((res) => {
                    if (res.data === null) {
                        message.error('账户或者密码错误！！')
                        return appActions.transformAction()
                    } else {
                        message.success('登录成功！！')
                    }
                    return appActions.changeLoginState({ isLogin: true })
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
                    if (res.err) {
                        message.warn('用户已存在！！')
                        return appActions.changeRegisterState({ isRegister: false })
                    } else {
                        message.success('注册成功！！')
                        return appActions.changeRegisterState({ isRegister: true })
                    }
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
                    if (res.err) {
                        message.warn('用户已存在！！')
                        return appActions.changeRegisterState({ isRegister: false })
                    } else {
                        message.success('注册成功！！')
                        return appActions.changeRegisterState({ isRegister: true })
                    }
                })
            );
        }),
        catchError((err) => {
            return [];
        })
    );
};