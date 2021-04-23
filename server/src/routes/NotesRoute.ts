import express from 'express'
import { NotesService } from '../services/NotesService'
import ResponseHelper from '../utils/ResponseHelper'

const noteRoute = express.Router();

// 获得所有数据
noteRoute.get('/', async (req, res) => {
    const result = await NotesService.getAllContent()
    ResponseHelper.sendData(result, res)
})

// 删除数据
noteRoute.delete("/:id", async (req, res) => {
    try {
        await NotesService.deleteContent(req.params.id)
        ResponseHelper.sendData("success", res)
    } catch {
        ResponseHelper.sendError('id无效', res)
    }
})

// 添加数据
noteRoute.post('/', async (req, res) => {
    const result = await NotesService.addContent(req.body)
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, res)
    } else {
        ResponseHelper.sendData(result, res)
    }
})


export default noteRoute