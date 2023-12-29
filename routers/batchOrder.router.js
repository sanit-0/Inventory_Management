import express from "express";
import { addBatchOrder, getBatchOrder, getBatchOrders, updateBatchOrder } from "../controllers/batchOrder.controller";

const router  = express.Router()

router.post('/addbatchorder',addBatchOrder)
router.get('/getBatchOrders',getBatchOrders)
router.get('/getBatchOrder/:orderId',getBatchOrder)
router.put('/updateBatchOrder/:orderId',updateBatchOrder)


export default router