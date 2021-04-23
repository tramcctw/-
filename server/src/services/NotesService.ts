import { Notes } from '../entities/Notes'
import { NotesModel } from '../db/db'
import { INotes } from '../db/NotesSchema'


export class NotesService {
    public static async addContent(note: Notes): Promise<INotes | string[]> {
        note = Notes.transform(note)
        const errors = await note.validateCurr()
        if (errors.length > 0) {
            return errors
        }
        return await NotesModel.create(note);
    }

    public static async deleteContent(id: string): Promise<void> {
        await NotesModel.deleteOne({ _id: id })
    }

    public static async getAllContent(): Promise<INotes[]> {
        return await NotesModel.find()
    }
}