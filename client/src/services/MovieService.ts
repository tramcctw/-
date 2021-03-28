import axios from "axios";
import {
  IResponseData,
  IResponseError,
  IMovie,
  ISearchCondition,
  IResponsePageData,
} from "./interface";

export class MovieService {
  /**
   * static add
   */
  public static async add(
    movie: IMovie
  ): Promise<IResponseData<IMovie> | IResponseError> {
    const { data } = await axios.post("/api/movie", movie);
    return data;
  }

  /**
   * 删除
   */
  public static async delete(id: string): Promise<IResponseData<string>> {
    const { data } = await axios.delete(`/api/movie/${id}`);
    return data;
  }

  /**
   * 获得单个数据
   */
  public static async getSingleData(
    id: string
  ): Promise<IResponseData<IMovie | null | string>> {
    const { data } = await axios.get(`/api/movie/${id}`);
    return data;
  }

  /**
   * 修改
   */
  public static async edit(
    id: string,
    movie: IMovie
  ): Promise<IResponseData<string> | IResponseError> {
    const { data } = await axios.put(`/api/movie/${id}`, movie);
    return data;
  }

  /**
   * 分页查询
   */
  public static async find(
    condition: ISearchCondition
  ): Promise<IResponsePageData<IMovie> | IResponseError> {
    const { data } = await axios.get(`/api/movie`, {
      params: condition,
    });
    return data;
  }
}
