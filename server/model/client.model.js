import {npmCalls} from "../util/npm-calls.util";
import {dbTable} from "../data/dbtable";
import {type_objectId} from "../util/mongoose.util";
const {mongoose,Schema} = npmCalls.mongooseImport()

const ClientSchema = Schema({
    username : {type : String,trim : true,required : true},
    documentId : {type : String,trim: true,required : true,unique : true},
    bankaccount : [
        {type : type_objectId(),ref : dbTable.account}
    ]
},{timestamps : true})


export default mongoose.model(dbTable.client,ClientSchema)
