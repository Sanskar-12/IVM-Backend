import express from "express"
import { createPdf,getPdf} from "../controllers/dynPdf.js";
const router = express.Router(); 

router.post('/create-pdf', createPdf );
router.get('/fetch-pdf/:id', getPdf );

export default router;