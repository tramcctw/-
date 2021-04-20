import { Type } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";
import BaseSet from "./BaseSet";

export default class SearchCondition extends BaseSet {
  @IsInt({ message: "页码必须是整数" })
  @Min(1, { message: "页面最小值为1" })
  @Type(() => Number)
  public page: number = 1;

  @IsInt({ message: "查询数量必须是整数" })
  @Min(1, { message: "查询数量不能小于1" })
  @Type(() => Number)
  public limit: number = 10;

  @Type(() => String)
  public key: string = "";

  public static transform(plainObj: object): SearchCondition {
    return super.baseTransform(SearchCondition, plainObj);
  }
}
