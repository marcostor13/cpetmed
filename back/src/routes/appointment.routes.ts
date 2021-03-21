import { Router } from "express"
import { save, get, getByID, update, del, updateAppointmentData } from './../controllers/appointment.controller';

const router = Router()

const title = 'appointment'

router.post(`/save-${title}`, save)
router.post(`/update-${title}-data`, updateAppointmentData)
router.get(`/get-${title}`, get)
router.get(`/get-${title}-by-id/:id`, getByID)
router.patch(`/update-${title}/:id`, update)
router.post(`/delete-${title}`, del)


export default router