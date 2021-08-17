const {npmCalls} = require("../util/npm-calls.util");
import accountRoute from "./account.route"
import transactionRoute from "./transaction.route"

const router = npmCalls.routerImport()

router.use("/account",accountRoute)
router.use("/transaction",transactionRoute)

export default router

