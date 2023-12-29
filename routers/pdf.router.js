import  express  from "express";
import { addPdf, getpdf } from "../controllers/pdf.controller";

const router = express.Router()

router.post('/addPdf',addPdf)
router.get('/getPdf/:orderid',getpdf)

export default router