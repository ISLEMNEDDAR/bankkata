import {errorHandler} from "./errorHandler.util";
import {responseHandler} from "./resHandler.util";


const treatExpressValidator = async (req, res, callback) => {
    try {
        const iserror = errorHandler.reponseErrorValidation(req, res)
        if (!iserror) {
            const response = await callback()
            if(response) {return responseHandler.responseOkServer(res,response)}
            else{return response}
        }
    } catch (err) {
        console.log(err)
        return responseHandler.responseErrorServer(res, err)
    }
}

export const controllerUtil = {
    treatExpressValidator
}
