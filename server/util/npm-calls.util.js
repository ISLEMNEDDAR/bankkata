import mongoose,{Schema} from "mongoose";
import { Router } from "express";

const mongooseImport = ()=>{
    return{mongoose,Schema}
}

const routerImport = ()=>{
    return Router()
}
export const npmCalls = {
    mongooseImport,
    routerImport
}
