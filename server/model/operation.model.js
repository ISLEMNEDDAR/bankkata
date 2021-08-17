import {dbTable} from "../data/dbtable";
import {type_objectId} from "../util/mongoose.util";
import {generalUtil} from "../util/general.util";
import {typeTransaction} from "../data/account.data";
import {npmCalls} from "../util/npm-calls.util";

const {mongoose,Schema} = npmCalls.mongooseImport()

const TransactionSchema = Schema({
    accountid : {type : type_objectId(),ref : dbTable.account},
    label : {type : String,enum : generalUtil.fromObjToArray(typeTransaction),required : true},
    amount : {type  : Number,default : 0,required : true},
    balance : {type : Number,required : true}
},{timestamps : true})


export default mongoose.model(dbTable.transaction,TransactionSchema)
