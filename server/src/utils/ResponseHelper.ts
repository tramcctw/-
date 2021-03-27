import { Response } from "express";
import { ISeacrchRes } from "../interface/interface";

export default class ResponseHelper {
  public static sendError(err: string[] | string, res: Response) {
    let result;
    if (Array.isArray(err)) {
      result = {
        err: err.join(";"),
        data: null,
      };
    } else {
      result = {
        err,
        data: null,
      };
    }
    res.send(result);
  }

  public static sendData(data: any, res: Response) {
    const result = {
      err: null,
      data,
    };
    res.send(result);
  }

  public static sendPageData<T>(result: ISeacrchRes<T>, res: Response) {
    if (result.errors.length) {
      ResponseHelper.sendError(result.errors, res);
      return;
    }
    res.send({
      data: result.data,
      err: null,
      count: result.count,
      total: result.total,
    });
  }
}
