import {Account, Client} from "../model";
import { v4 as uuidv4 } from 'uuid';
import {accountService} from "./account.service";

const getClientWithDocumentId = (documentId)=>{
    return Client.findOne({documentId})
}

const createClientAccount = async (username, documentId) => {
    const client = new Client({username, documentId})
    await client.save()
    let bankaccountid = uuidv4()
    let account = await accountService.findAccountWithBankAccount(bankaccountid)
    while(account){
        bankaccountid = uuidv4()
        account = await accountService.findAccountWithBankAccount(bankaccountid)
    }
    const newAccount = new Account({bankaccountid, clientid : client._id})
    await newAccount.save()
    client.bankaccount.push(newAccount._id)
    await client.save()
    return bankaccountid
}
export const clientService = {
    getClientWithDocumentId,
    createClientAccount
}
