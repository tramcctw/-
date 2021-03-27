import Mongoose from "mongoose";
import MovieModel from "./MovieSchema";

Mongoose.connect("mongodb://localhost:27017/moviedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("数据库已连接");
});

export { MovieModel };
