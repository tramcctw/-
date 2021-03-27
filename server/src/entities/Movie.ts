import { Type } from "class-transformer";
import BaseSet from "./BaseSet";
import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  Min,
  Max,
  IsArray,
} from "class-validator";

class Movie extends BaseSet {
  @IsNotEmpty({ message: "电影不能为空" })
  @Type(() => String) // 将转换过来的的平面对象内部的该属性转换为String
  public name: String;

  @IsNotEmpty({ message: "电影类型不能为空" })
  @ArrayMinSize(1, { message: "电影类型至少一个" })
  @IsArray({ message: "电影类型必须是数组" })
  @Type(() => String) // 将数组的每一项转换为string
  public types: string[];

  @IsNotEmpty({ message: "上映地区不能为空" })
  @ArrayMinSize(1, { message: "上映地区至少有一个" })
  @IsArray({ message: "上映地区必须是数组" })
  @Type(() => String)
  public areas: string[];

  @IsNotEmpty({ message: "时长不能为空" })
  @IsInt({ message: "时长必须是整数" })
  @Min(1, { message: "时长做小1分钟" })
  @Max(999999, { message: "时长过长" })
  @Type(() => Number)
  public timeLong: number;

  @IsNotEmpty({ message: "是否热映不能为空" })
  @Type(() => Boolean)
  public isHot: boolean;

  @IsNotEmpty({ message: "是否即将上映不能为空" })
  @Type(() => Boolean)
  public isComming: boolean;

  @IsNotEmpty({ message: "是否是经典影片不能为空" })
  @Type(() => Boolean)
  public isClassic: boolean;

  @Type(() => String)
  public description?: string;

  @Type(() => String)
  public poster?: string;

  /**
   * 平面对象类型转化
   */
  public static transform(plainObj: object): Movie {
    return super.baseTransform(Movie, plainObj);
  }
}

export default Movie;
