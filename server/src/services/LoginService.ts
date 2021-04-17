import Admin from '../entities/Admin'
import md5 from 'md5'
import { AdminModel } from '../db/db'
import { IAdmin } from '../db/AdminSchema'

class AdminService {
    public static async addAdmin(admin: Admin): Promise<IAdmin | string[]> {
        admin = Admin.transform(admin);
        const errors = await admin.validateCurr();
        if (errors.length > 0) {
            return errors;
        }
        const res: any = await AdminService.findAdmin(admin)
        console.log(res)
        if (res !== null && res.username) {
            return ['用户已存在']
        }
        admin.password = md5(admin.password)
        return await AdminModel.create(admin);
    }

    public static async findAdmin(admin: Admin): Promise<IAdmin | null | string[]> {
        admin = Admin.transform(admin)
        const errors = await admin.validateCurr();
        if (errors.length > 0) {
            return errors;
        }
        admin.password = md5(admin.password)
        return await AdminModel.findOne(admin)
    }
}

export default AdminService