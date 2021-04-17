import { Type } from "class-transformer";
import BaseSet from "./BaseSet";
import {
    IsNotEmpty,
    Min,
    Max,
} from "class-validator";

class Admin extends BaseSet {

    @IsNotEmpty({ message: "用户名不能为空" })
    @Type(() => String)
    public username: string;

    @IsNotEmpty({ message: "密码不能为空" })
    @Type(() => String)
    public password: string

    public static transform(plainObj: object): Admin {
        return super.baseTransform(Admin, plainObj);
    }
}

export default Admin