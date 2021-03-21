import { Router } from "express"
import { save, get, getByID, update, del, getByEmail, getBySpecialty} from './../controllers/doctor.controller';

const router = Router()

const title = 'doctor'

router.post(`/save-${title}`, save)
router.get(`/get-${title}`, get)
router.get(`/get-${title}-by-id/:id`, getByID)
router.get(`/get-${title}-by-email/:email`, getByEmail)
router.get(`/get-${title}-by-specialtyid/:specialtyid`, getBySpecialty)
router.patch(`/update-${title}/:id`, update)
router.delete(`/delete-${title}/:id`, del)


export default router