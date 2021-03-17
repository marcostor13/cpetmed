import { Router } from "express"
import { getData } from '../controllers/dashboard.controller';

const router = Router()

router.get('/get-data-dashboard/:userid', getData)

export default router