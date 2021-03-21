import { Router } from "express"
import { save, get, getByID, update, del } from './../controllers/equipment.controller';

const router = Router()

const title = 'equipment'

router.post(`/save-${title}`, save)
router.get(`/get-${title}`, get)
router.get(`/get-${title}-by-id/:id`, getByID)
router.patch(`/update-${title}/:id`, update)
router.delete(`/delete-${title}/:id`, del)


export default router