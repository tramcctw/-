import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { IConstraints } from "../interface/interface";

export default abstract class BaseSet {
  /**
   * 数据验证
   * 返回一个promise
   * promise完成之后得到的类型，用泛型传入类型
   */
  public async validateCurr(skipMiss = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties: skipMiss,
    });
    const temp = errors.map((e) =>
      Object.values(e.constraints as IConstraints)
    );
    const res: string[] = [];
    temp.forEach((item) => {
      res.push(...item);
    });
    return res;
  }
  /**
   * 平面对象类型转化
   */
  protected static baseTransform<T>(
    cls: ClassConstructor<T>,
    plainObj: object
  ): T {
    if (plainObj instanceof cls) {
      return plainObj;
    }
    return plainToClass(cls, plainObj);
  }
}
