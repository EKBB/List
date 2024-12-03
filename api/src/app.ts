import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers, singin } from "./controllers/UserControler";
import { registerTask, searchTask } from "./controllers/TaskController";



const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
    res.send("Hola desde mi servidor con TS");
})

//USUARIOS
app.post("/users/create",registerUsers)
app.post("/users/login",singin)

//QUESTIONARIO
app.post("/tasks/create", registerTask)
app.post("/tasks/search", searchTask)



export default app;