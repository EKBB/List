import { Schema, model } from "mongoose";
import { ITasks } from "../@types/GlobalTypes";


const taskSchema = new Schema<ITasks>({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    isChecked:{
        type: Boolean,
        required: true
    },
    date:{
        type: String,
        required: false
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

export const taskModel = model("tasks", taskSchema)