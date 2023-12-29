import express from "express";
import { addBatch, deleteBatch, getBatch, getBatches, removeBatch, updateBatch } from "../controllers/batch.controller";

const router  = express.Router()

router.post('/addbatch',addBatch)
router.get('/getbatches',getBatches)
router.get('/getBatch/:batchid',getBatch)
router.put('/updateBatch/:batchid',updateBatch)
router.delete('/deletebatch/:batchid',deleteBatch)
router.delete('/removebatch/:batchid',removeBatch)


export default router