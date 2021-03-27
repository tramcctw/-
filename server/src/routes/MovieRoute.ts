import express from "express";
import { MovieService } from "../services/MovieService";
import ResponseHelper from "../utils/ResponseHelper";

const movieRoute = express.Router();

movieRoute.get("/:id", async (req, res) => {
  try {
    const result = await MovieService.findById(req.params.id);
    ResponseHelper.sendData(result, res);
  } catch {
    ResponseHelper.sendData("id无效", res);
  }
});

movieRoute.get("/", async (req, res) => {
  const result = await MovieService.find(req.query as any);
  ResponseHelper.sendPageData(result, res);
});

movieRoute.post("/", async (req, res) => {
  const result = await MovieService.add(req.body);
  if (Array.isArray(result)) {
    ResponseHelper.sendError(result, res);
  } else {
    ResponseHelper.sendData(result, res);
  }
});

movieRoute.put("/:id", async (req, res) => {
  try {
    const result = await MovieService.edit(req.params.id, req.body);
    if (result.length > 0) {
      ResponseHelper.sendError(result, res);
    } else {
      ResponseHelper.sendData("success", res);
    }
  } catch {
    ResponseHelper.sendData("id无效", res);
  }
});

movieRoute.delete("/:id", async (req, res) => {
  try {
    await MovieService.delete(req.params.id);
    ResponseHelper.sendData("success", res);
  } catch {
    ResponseHelper.sendData("id无效", res);
  }
});

export default movieRoute;
