import {Account, Transaction} from "../model";
import {typeTransaction} from "../data/account.data";

const findAccountWithBankAccount = (bankaccountid)=>{
    return Account.findOne({bankaccountid})
}

const desposite = async (bankAccount, amount) => {

    const isfacilitecaisse = bankAccount.isfacilitecaisse
    const facilitecaiseSpended = bankAccount.facilitecaiseSpended
    const toAddToBalance = facilitecaiseSpended >= amount ? 0 : amount - facilitecaiseSpended
    console.log(toAddToBalance)
    if(isfacilitecaisse && facilitecaiseSpended > 0){
        const toAddtoCaisee = facilitecaiseSpended >= amount ? amount : facilitecaiseSpended
        console.log(toAddtoCaisee)
        bankAccount.facilitecaiseSpended = facilitecaiseSpended - toAddtoCaisee
    }
    bankAccount.balance = bankAccount.balance + toAddToBalance
    const transaction = new Transaction({
        accountid: bankAccount.id,
        label: typeTransaction.deposit,
        amount,
        balance : bankAccount.facilitecaiseSpended > 0 ? -1*bankAccount.facilitecaiseSpended : bankAccount.balance
    })
    await transaction.save()
    bankAccount.transaction.push(transaction._id)
    await bankAccount.save()
    return true
}

const withdraw = async (bankAccount, amount) => {
    const balance = bankAccount.balance
    const isfacilitecaisse = bankAccount.isfacilitecaisse
    const facilitecaise = bankAccount.facilitecaise
    const facilitecaiseSpended = bankAccount.facilitecaiseSpended
    const difference = balance < amount ? amount - balance : balance - amount
    let message = "withdraw success"
    if (balance < amount) {
        if (isfacilitecaisse && facilitecaise > facilitecaiseSpended && facilitecaise-facilitecaiseSpended >= difference) {
            bankAccount.balance = 0
            bankAccount.facilitecaiseSpended = facilitecaiseSpended + difference
            message = "withdraw success but facilite caisse is at" + Number(facilitecaise - bankAccount.facilitecaiseSpended)
        } else {
            return {error: true, message: "account balance low you can only withdraw "+Number(balance+facilitecaise-facilitecaiseSpended)}
        }
    } else {
        bankAccount.balance = difference
    }
    const transaction = new Transaction({
        accountid: bankAccount.id,
        label: typeTransaction.withdraw,
        amount,
        balance :  bankAccount.balance
    })
    await transaction.save()
    await bankAccount.save()
    return {error : false,message : message}
}

export const accountService = {
    findAccountWithBankAccount,
    desposite,
    withdraw
}
