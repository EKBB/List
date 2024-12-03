import { Request, Response } from "express";
import { taskModel } from "../models/TasksModel";

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

export const searchTask = async (req:Request, res:Response):Promise<any>=>{
    //verificar que el questionario existe
    try{
        const task = await taskModel.findOne({title:req.body.title, userId:req.body.userId} )

        if(!task){
             //si no existe devuelven error
            return res.status(400).json({
                msg: "No existe la tarea"
            })
        }
              //si existe devuelven token

        return res.status(200).json({
            msg: "Tarea existe",
            task
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error al obtener la tarea"
        })
    }
}