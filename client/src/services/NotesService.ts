import axios from 'axios'
import { INotes, IResponseData, IResponseError } from './interface'

export default class NotesService {

    public static async addContent(note: INotes): Promise<IResponseData<INotes> | IResponseError> {
        const { data } = await axios.post('/api/notes', note)
        return data
    }

    public static async deleteContent(id: string): Promise<IResponseData<string>> {
        const { data } = await axios.delete(`/api/notes/${id}`)
        return data
    }

    public static async getAllContent(): Promise<IResponseData<INotes[]>> {
        const { data } = await axios.get('/api/notes')
        return data
    }
}

