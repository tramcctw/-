import axios from 'axios'
import { IResponseData, ILoginRes, IResponseError } from './interface'

export class LoginService {

    public static async login(admin: ILoginRes): Promise<IResponseData<ILoginRes[]> | IResponseError> {
        const { data } = await axios.post('/api/login', admin)
        return data
    }

    public static async register(admin: ILoginRes): Promise<IResponseData<ILoginRes[]> | IResponseError> {
        const { data } = await axios.put('/api/login', admin)
        return data
    }
}