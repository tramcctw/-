import Mongoose from "mongoose";
import Movie from "../entities/Movie";

export interface IMovie extends Movie, Mongoose.Document {}
// 增加一些额外的方法,id等，继承Mongoose.Document

// 设计集合结构
const movieSchema = new Mongoose.Schema<IMovie>(
  {
    name: String,
    types: [String],
    areas: [String],
    timeLong: Number,
    isHot: Boolean,
    isComing: Boolean,
    isClassic: Boolean,
    description: String,
    poster: String,
  },
  {
    versionKey: false,
  }
);

export default Mongoose.model<IMovie>("Movie", movieSchema);
// 创建集合导出，集合使用的模板是movieSchema
