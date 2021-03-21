import { CFormUser } from './../../home/models/form-user';

export class CAppointment {
    _id = null    
    createdAt: string
    date: string
    doctor: string
    doctorid: string
    hour: string
    specialty: string
    specialtyid: string
    dateUser: CFormUser
}

