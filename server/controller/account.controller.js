import {controllerUtil} from "../util/controller.util";
import {responseHandler} from "../util/resHandler.util";
import {clientService} from "../services/client.service";
import {accountService} from "../services/account.service";
import {typeTransaction} from "../data/account.data";
import moment from "moment";
import {dateUtil} from "../util/date.util";
import {transactionService} from "../services/transaction.service";

const create = async (req,res) => {
    await controllerUtil.treatExpressValidator(req, res, async () => {
        const {username, documentId} = req.body
        if (!username || !documentId) {
            return responseHandler.responseBadResquest(res, {message: "cant create the account"})
        }
        const client = await clientService.getClientWithDocumentId(documentId)
        if(client){
            return responseHandler.responseUnproccesabaleEntity(res,{message : "client already exist"})
        }
        const bankaccount = await clientService.createClientAccount(username,documentId)
        return {
            bankAccount : bankaccount
        }
    })
}

const deposite = async (req,res) => {
    await controllerUtil.treatExpressValidator(req, res, async () => {
        const {bankaccountid,amount} = req.body
        if(!bankaccountid || !amount || amount < 0 ){
            return responseHandler.responseBadResquest(res,{message : "bad data request"})
        }
        const bankAccount = await accountService.findAccountWithBankAccount(bankaccountid)
        if(!bankAccount){
            return responseHandler.responseNotFound(res,{message : "not found error"})
        }
        const updated = await accountService.desposite(bankAccount,amount)
        if(updated){
            return {
                message : "deposit success"
            }
        }
    })
}

const withdraw = async (req,res) => {
    await controllerUtil.treatExpressValidator(req, res, async () => {
        const {bankaccountid, amount} = req.body
        if (!bankaccountid || !amount || amount < 0) {
            return responseHandler.responseBadResquest(res, {message: "bad data request"})
        }
        const bankAccount = await accountService.findAccountWithBankAccount(bankaccountid)
        if (!bankAccount) {
            return responseHandler.responseNotFound(res, {message: "not found error"})
        }
        const {error,message} = await accountService.withdraw(bankAccount,amount)
        return {
            message
        }
    })
}

const checkOperation = async (req,res) => {
    await controllerUtil.treatExpressValidator(req, res, async () => {
        const {datebegin, dateend, bankaccountid} = req.body
        console.log(datebegin)
        console.log(dateend)
        if (moment(dateend).isBefore(datebegin) || !dateUtil.validateDate(datebegin) || !dateUtil.validateDate(dateend)
            || moment(datebegin).isAfter(new Date()) || !bankaccountid) {
            return responseHandler.responseBadResquest(res, {message: "error in data"})
        }
        const bankAccount = await accountService.findAccountWithBankAccount(bankaccountid)
        if (!bankAccount) {
            return responseHandler.responseNotFound(res, {message: "not found error"})
        }
        const transaction = await transactionService.getTrasactionBetweenDates(datebegin,dateend,bankAccount._id)
        return {
            transaction
        }
    })
}

export const accountController = {
    create,
    deposite,
    withdraw,
    checkOperation
}
