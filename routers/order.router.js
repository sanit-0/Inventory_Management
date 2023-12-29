import express from "express";
import { addOrder, getOrder, getOrders, updateOrder } from "../controllers/order.controller";

const router  = express.Router()

router.post('/addorder',addOrder)
router.get('/getorders',getOrders)
router.get('/getorder/:orderId',getOrder)
router.put('/updateorder/:orderId',updateOrder)


export default router