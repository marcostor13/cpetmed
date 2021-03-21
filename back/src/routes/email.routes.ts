import { Router } from "express"
import { sendEmail, sendEmailAdmin, sendEmailPatient } from './../controllers/email.controller';

const router = Router()

router.post('/send-email', sendEmail)
router.post('/send-email-admin', sendEmailAdmin)
router.post('/send-email-patient', sendEmailPatient)


export default router