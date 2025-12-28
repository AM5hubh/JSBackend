import {Router} from "express";
import { addTransaction, getUserTransactions, deleteTransaction,editTransaction } from "../controllers/transactions.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()


router.route("/addtransaction").post(verifyJWT,addTransaction)
router.route("/usertransactions").get(verifyJWT,getUserTransactions)
router.route("/removetransaction").post(verifyJWT,deleteTransaction)
router.route("/edittransaction").patch(verifyJWT,editTransaction)

export default router