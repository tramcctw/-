import BaseSet from "./BaseSet";
import {
    IsNotEmpty,
} from "class-validator";

export class Notes extends BaseSet {

    @IsNotEmpty({ message: '内容不能为空' })
    public content: String

    public static transform(plainObj: object): Notes {
        return super.baseTransform(Notes, plainObj);
    }
}