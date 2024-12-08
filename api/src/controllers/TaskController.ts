import { Request, Response } from "express";
import { taskModel } from "../models/TasksModel";
import { UserModel } from "../models/UsersModel";

export const registerTask= async (req: Request, res: Response,): Promise<any> => {
    try {
       
        //validar que los datos existen
        const title= req.body.title
        const description= req.body.description
        const isChecked= req.body.isChecked
        const date= req.body.date
        const userId= req.body.userId
        

        if (!title || !description || !userId || isChecked === undefined){
            return res.status(400).json({
                msg: "faltan datos para crear una tarea"
            })
        }

        const task = await taskModel.create({
           title,
           description,
           isChecked,
           date,
           userId
        })

        return res.status(200).json({
            msg: "Tarea creada con exito", task
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al crear la tarea"
        })
    }
}

export const getMetrics = async (req:Request, res:Response):Promise<any>=>{
    try {
        const numberUsers = await UserModel.find({rol:"client"}).countDocuments()
        const numberTasks = await taskModel.find().countDocuments()

        return res.status(200).json({
            msg: "Datos obtenidos con exito", numberTasks, numberUsers
        })
       
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al obtener las metricas de la aplicacion"
        })
    }
}

export const getTask = async (req:Request, res:Response):Promise<any>=>{
    try {
        const task = await taskModel.find({userId: req.params.userId})

        if (!task) {
            return res.status(200).json({
                msg: 'No se encontraron tareas para este usuario',
            });
        }
        return res.status(200).json({
            msg: "Tareas obtenidas con exito", task
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error obtener las tareas"
        })
    }
}

export const deleteTask = async (req:Request, res:Response): Promise<any>=>{
    try {
        await taskModel.findByIdAndDelete({_id: req.params.taskId})

        return res.status(200).json({
            msg: "Tarea eliminada con exito" 
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error eliminar la tarea"
        })
    }
}

export const updatetask = async (req:Request, res:Response): Promise<any>=>{
    try {
        const taskId = req.body._id
        const updatedtitle= req.body.title
        const updateddescription= req.body.description
        const updatedisChecked= req.body.isChecked
        const updateddate= req.body.date
        const userId= req.body.userId 

        const taskToUpdate = await taskModel.findOneAndUpdate(
            {userId: userId, _id: taskId},
            {
                title: updatedtitle,
                description: updateddescription,
                isChecked: updatedisChecked,
                date: updateddate
            },
            {
                returnOriginal: false
            })

            if(!taskToUpdate){
                return res.status(404).json({
                    msg: "No existe la tarea"
                })
            }
        return res.status(200).json({
            msg: "Tarea actualizada con exito", taskToUpdate
        })
            
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al actualizaar la tarea"
        })
    }
}