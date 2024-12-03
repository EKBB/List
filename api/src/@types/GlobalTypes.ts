import { Schema } from "mongoose";

export interface IUser {
    name: String;
    email: String;
    lastName: String;
    password: String;
    rol: "administrador" | "client"
}

export interface ITasks {
    title: String;
    description: String;
    isChecked: Boolean;
    date?: String;    
    userId: Schema.Types.ObjectId | String;
}
