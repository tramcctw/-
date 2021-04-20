import express from 'express'
import { readBuilderProgram } from 'typescript';
import LoginServ from '../services/LoginService'
import ResponseHelper from "../utils/ResponseHelper";

const loginRoute = express.Router();

// 登录
loginRoute.post('/', async (req, res) => {
    const result = await LoginServ.findAdmin(req.body)
    if (result.length === 0) {
        // 无法登录
        ResponseHelper.sendError(['用户不存在'], res)
    } else {
        // 可以登录
        ResponseHelper.sendData(result, res)
    }
})

// 注册
loginRoute.put('/', async (req, res) => {
    const result = await LoginServ.addAdmin(req.body)
    console.log(result)
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, res)
    } else {
        ResponseHelper.sendData(result, res)
    }
})

export default loginRoute