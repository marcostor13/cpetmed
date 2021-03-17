import { Router } from "express"
import { save, get, getByID, update, del } from './../controllers/events.controller';

const router = Router()

router.post('/save-event', save)
router.get('/get-events', get)
router.get('/get-event-by-id/:id', getByID)
router.patch('/update-event/:id', update)
router.delete('/delete-event/:id', del)


export default router