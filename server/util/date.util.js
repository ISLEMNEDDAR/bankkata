import moment from "moment";

const validateDate = (value)=>{
    return moment(value, 'YYYY-MM-DD',true).isValid()
}

export const dateUtil = {
    validateDate
}
