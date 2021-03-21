import { Router } from "express"
import { save, get, getByID, update, del, getByEmail } from './../controllers/patient.controller';

const router = Router()

const title = 'patient'

router.post(`/save-${title}`, save)
router.get(`/get-${title}`, get)
router.get(`/get-${title}-by-id/:id`, getByID)
router.get(`/get-${title}-by-email/:email`, getByEmail)
router.patch(`/update-${title}/:id`, update)
router.delete(`/delete-${title}/:id`, del)


export default router