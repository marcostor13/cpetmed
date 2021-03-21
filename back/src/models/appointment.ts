import { model, Schema, Document } from 'mongoose'


export interface IAppointment extends Document {
    _id: string,
    specialtyid: string,
    specialty: string,
    doctorid: string,
    doctor: string,
    date : string,
    hour : string,
    dataUser : object,
    createdAt: Date
}

const eventSchema = new Schema({

    specialtyid : {
        type: String,
        default: null
    },
    specialty: {
        type: String,
        default: null
    },
    doctorid : {
        type: String,
        default: null
    },
    doctor: {
        type: String,
        default: null
    },
    date : {
        type: String,
        default: null
    },
    hour : {
        type: String,
        default: null
    },
    dataUser : {
        type: Object,
        default: null
    },
    createdAt : {
        type: String,
        default: new Date()
    },

})


export default model<IAppointment>('Appointment', eventSchema)

