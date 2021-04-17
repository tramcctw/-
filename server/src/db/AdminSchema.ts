import Mongoose from "mongoose";
import Admin from '../entities/Admin'

export interface IAdmin extends Admin, Mongoose.Document { }

const adminSchema = new Mongoose.Schema<IAdmin>(
    {
        username: String,
        password: String
    },
    {
        versionKey: false
    }
)
export default Mongoose.model<IAdmin>('Admin', adminSchema)