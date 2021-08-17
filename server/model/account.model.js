import {npmCalls} from "../util/npm-calls.util";
import {type_objectId} from "../util/mongoose.util";
import {dbTable} from "../data/dbtable";
import {typeCurrency} from "../data/account.data";
import {generalUtil} from "../util/general.util";

const {mongoose,Schema} = npmCalls.mongooseImport()

const AccountSchema = Schema({
    bankaccountid : {type : String,unique : true,trim : true,required : true},
    clientid : {type : type_objectId(),ref : dbTable.client},
    balance : {type : Number,default : 0},
    isfacilitecaisse : {type : Boolean,default: true},
    facilitecaise : {type : Number, default : 500},
    facilitecaiseSpended : {type : Number,default : 0},
    currency : {type : String,enum : generalUtil.fromObjToArray(typeCurrency)},
    transaction : [
        {type : type_objectId(),ref: dbTable.transaction}
    ],
    password : {type : String,}
},{timestamps : true})


export default mongoose.model(dbTable.account,AccountSchema)
