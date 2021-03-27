import Movie from "../entities/Movie";
import { IMovie } from "../db/MovieSchema";
import { MovieModel } from "../db/db";
import SearchCondition from "../entities/SearchConditions";
import { ISeacrchRes } from "../interface/interface";

export class MovieService {
  /**
   *
   * @param movie 注意这里是可以接受一个平面对象的
   * @returns
   */
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 平面对象转换
    movie = Movie.transform(movie);
    // 数据验证
    const errors = await movie.validateCurr();
    if (errors.length > 0) {
      return errors;
    }
    // 添加数据库
    return await MovieModel.create(movie);
  }

  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 平面对象转换
    movie = Movie.transform(movie);
    // 如果有默认值，则没有的字段使用默认值
    // 数据验证
    const errors = await movie.validateCurr(true);
    if (errors.length > 0) {
      return errors;
    }
    await MovieModel.updateOne({ _id: id }, movie);
    return [];
  }

  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({ _id: id });
  }

  public static async findById(id: string): Promise<IMovie | null> {
    return await MovieModel.findById({ _id: id });
  }

  /**
   * condition page limit key
   */
  public static async find(
    condition: SearchCondition
  ): Promise<ISeacrchRes<IMovie>> {
    condition = SearchCondition.transform(condition);
    const errors = await condition.validateCurr(true);
    if (errors.length > 0) {
      return {
        count: 0,
        data: [],
        errors,
        total: 0,
      };
    }
    const movies = await MovieModel.find({
      name: {
        $regex: new RegExp(condition.key) as any,
      },
    })
      .skip((condition.page - 1) * condition.limit)
      .limit(condition.limit);
    const totalMovie = await MovieModel.find();
    const total = totalMovie.length;
    const count = movies.length;
    return {
      count,
      data: movies,
      errors: [],
      total,
    };
  }
}
