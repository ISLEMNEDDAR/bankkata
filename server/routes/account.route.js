import account from "../model/account.model";
import {accountController} from "../controller/account.controller";

const {npmCalls} = require("../util/npm-calls.util");
const router = npmCalls.routerImport()

router.post("/create",accountController.create)
router.post("/deposit",accountController.deposite)
router.post("/withdraw",accountController.withdraw)
router.get("/check-operation",accountController.checkOperation)
export default router
