import {paginationUtil} from "./pagination.util";

const statusResponse = {
    STATUS_SERVER_ERROR : 500,
    STATUS_UNPROCESSABLE_ENTITY : 422,
    STATUS_ANAUTHORIZED : 401,
    STATUS_OK: 200,
    BAD_REQUEST : 400,
    FOORBIDDEN : 403,
    NOT_FOUND : 404
}

const response = (res,status,data)=>{
    console.log("response")
    console.log(data)
    return res.status(status).json({
        ...data
    })
}

const responseOkServer = (res,message)=>{
    response(res,statusResponse.STATUS_OK,message)
}

const responseErrorServer = (res,err)=>{
    console.log(err)
    response(res, statusResponse.STATUS_SERVER_ERROR, {message: "internal Error"});
}

const responseUnautharized = (res,message) => {
    response(res,statusResponse.STATUS_ANAUTHORIZED,message)
}

const responseUnproccesabaleEntity = (res,message)=>{
    response(res,statusResponse.STATUS_UNPROCESSABLE_ENTITY,message)
}

const responseForrbien = (res,message) =>{
    response(res,statusResponse.FOORBIDDEN,message)
}

const responseBadResquest = (res,message) =>{
    response(res,statusResponse.BAD_REQUEST,message)
}
const responseNotFound = (res,message) =>{
    response(res,statusResponse.NOT_FOUND,message)
}

const checkPagination = (res,_start,_end)=>{
    if(paginationUtil.checkPaginationAttribut(parseInt(_start),parseInt(_end))){
        return {
            error : true,
            content : responseHandler.responseBadResquest(res,{message : "check the pagination attribut"})
        }
    }
    return {
        error : false,
        content : null
    }

}
export const responseHandler = {
    responseOkServer,
    responseForrbien,
    responseUnautharized,
    responseNotFound,
    responseBadResquest,
    responseUnproccesabaleEntity,
    responseErrorServer,
    checkPagination
}
