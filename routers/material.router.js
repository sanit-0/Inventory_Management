import express from "express";
import { addMaterial, deleteMaterial, getMaterial, getMaterials, removeMaterial, updateMaterial } from "../controllers/material.controller";

const router  = express.Router()

router.post('/addMaterial',addMaterial)

router.get('/getMaterials',getMaterials)

router.get('/getMaterial/:materialId',getMaterial)

router.put('/updateMaterial/:materialId',updateMaterial)

router.delete('/deleteMaterial/:materialId',deleteMaterial)

router.delete('/removeMaterial/:materialId',removeMaterial)



export default router