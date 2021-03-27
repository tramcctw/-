import multer from "multer";
import path from "path";
import express from "express";
import ResponseHelper from "../utils/ResponseHelper";

const fileRoute = express.Router();

const extname = [".png", ".jpg", ".gif", ".bmp", ".jiff"];

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../../public/upload"),
  filename: function (req, file, cb) {
    const dataTime = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${dataTime}${ext}`);
    // 设置上传文件名及后缀
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // 文件尺寸限制
  },
  fileFilter(req, file, cb) {
    // 限制文件的后缀
    if (extname.includes(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error("不支持该文件"));
    }
  },
}).single("fileImg");
// 上传文件保存的目录

// 单文件上传
fileRoute.post("/", (req, res) => {
  // 处理 错误响应
  upload(req, res, (err) => {
    if (err) {
      ResponseHelper.sendError(err.message, res);
    } else {
      ResponseHelper.sendData(`/upload/${req.file.filename}`, res);
    }
  });
});

export default fileRoute;
