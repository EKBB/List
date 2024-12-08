import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers, singin } from "./controllers/UserControler";
import { deleteTask, getMetrics, getTask, registerTask, updatetask } from "./controllers/TaskController";



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

//Tareas
app.post("/tasks/create", registerTask)
app.get("/tasks/getTasks/:userId", getTask)
app.get("/tasks/getMetrics", getMetrics)
app.put("/tasks/update", updatetask)
app.delete("/tasks/delete/:taskId", deleteTask)



export default app;