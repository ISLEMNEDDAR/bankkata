import {Transaction} from "../model";

const getTrasactionBetweenDates = (datebegin,dateend,bankAccountId) => {
    return Transaction.find({
        accountid : bankAccountId,
        createdAt : {
            $gte : new Date(datebegin),
            $lt : new Date(dateend)
        }
    }).select("amount createdAt label balance")
}

export const transactionService = {
    getTrasactionBetweenDates
}
