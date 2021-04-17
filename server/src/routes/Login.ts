import express from 'express'
import { readBuilderProgram } from 'typescript';
import LoginServ from '../services/LoginService'
import ResponseHelper from "../utils/ResponseHelper";

const loginRoute = express.Router();

loginRoute.post('/', async (req, res) => {
    const result = await LoginServ.findAdmin(req.body)
    if (Array.isArray(result) || result === null) {
        ResponseHelper.sendError(result, res)
    } else {
        ResponseHelper.sendData(result, res)
    }
})

loginRoute.put('/', async (req, res) => {
    const result = await LoginServ.addAdmin(req.body)
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, res)
    } else {
        ResponseHelper.sendData(result, res)
    }
})

export default loginRoute