import express from "express";
import movieRoute from "./MovieRoute";
import fileRoute from "./UpLoadRoute";
import noteRoute from './NotesRoute'
import loginRoute from './Login'
import path from "path";

const app = express();

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../../public")));

app.use("/api/movie", movieRoute);

app.use("/api/upload", fileRoute);

app.use("/api/login", loginRoute)

app.use("/api/notes", noteRoute)

app.listen(3001, () => {
  console.log("listener...");
});
