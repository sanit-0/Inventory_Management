import express from "express";
import { addInventory } from "../controllers/inventory.controller";

const router  = express.Router()

router.post('/addInventory/:materialId',addInventory)


export default router