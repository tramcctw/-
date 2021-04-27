import { ofType } from "redux-observable";
import { from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { appActions } from '../core'
import { message } from "antd";
import { IAction } from '../movie/slice'
import { LoginService } from '../../services/LoginService'

export const login = (action$) => {
    return action$.pipe(
        ofType(appActions.login),
        mergeMap((action: IAction<string, { username: string, password: string }>) => {
            return from(LoginService.login(action.payload)).pipe(
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

export const register = (action$) => {
    return action$.pipe(
        ofType(appActions.register),
        mergeMap((action: IAction<string, { username: string, password: string }>) => {
            return from(LoginService.register(action.payload)).pipe(
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