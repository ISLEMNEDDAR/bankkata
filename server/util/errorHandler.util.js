import {validationResult} from "express-validator";
import {responseHandler} from "./resHandler.util";
const handleValidationError = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors in")
        console.log(errors)
        return { iserror : true,errors : errors.errors}
    }
    return { iserror : false,errors: []}
}

const createErrorString = (errors)=>{
    console.log(errors.length)
    let resultString = errors.reduce((acc, error) => {
        if(acc instanceof Object) acc = acc.msg
        if(acc !== ""){
            acc+= ", "
        }
        acc += error.msg
        console.log(acc)
        return acc
    })
    return errors.length > 1 ? resultString : resultString.msg
}

const reponseErrorValidation = (req,res)=>{
    let {iserror, errors}= handleValidationError(req,res)
    if(iserror) {
        responseHandler.responseUnproccesabaleEntity(res,{message: createErrorString(errors)})
    }
    return iserror
}

export const errorHandler = {
    handleValidationError,createErrorString,reponseErrorValidation
}
