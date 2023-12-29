import express from "express";
import { addUnit, deleteUnit, getUnit, getUnits, removeUnit } from "../controllers/unit.controller";

const router  = express.Router()

router.post('/addUnit',addUnit)

router.get('/getUnits',getUnits)

router.get('/getUnit/:unitID',getUnit)

router.delete('/deleteUnit/:unitID',deleteUnit)

router.delete('/removeUnit/:unitID',removeUnit)



export default router