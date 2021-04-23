import Mongoose from "mongoose";
import { Notes } from "../entities/Notes";


export interface INotes extends Notes, Mongoose.Document { }

const notesSchema = new Mongoose.Schema<INotes>(
    {
        content: String
    },
    {
        versionKey: false,
    }
);

export default Mongoose.model<INotes>("Notes", notesSchema);
