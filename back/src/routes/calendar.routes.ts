import { Router } from "express"
import { save, get, getByID, update, del, getByDoctorID } from './../controllers/calendar.controller';

const router = Router()

const title = 'calendar'

router.post(`/save-${title}`, save)
router.get(`/get-${title}`, get)
router.get(`/get-${title}-by-id/:id`, getByID)
router.get(`/get-${title}-by-doctorid/:doctorid`, getByDoctorID)
router.patch(`/update-${title}/:id`, update)
router.delete(`/delete-${title}/:id`, del)


export default router