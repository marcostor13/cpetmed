import { Router } from "express"
import { save, get, getByID, update, del } from './../../controllers/admin/company.controller';

const router = Router()

router.post('/save-company', save)
router.get('/get-companies/:userid', get)
router.get('/get-company-by-id/:id', getByID)
router.patch('/update-company/:id', update)
router.delete('/delete-company/:id', del)


export default router