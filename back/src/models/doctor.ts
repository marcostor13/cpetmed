import { model, Schema, Document } from 'mongoose'


export interface IDoctor extends Document {
    _id: string,
    name: string,
    email: string,
    address: string,
    phone: string,
    dni: string,
    colegiatura: string,
    specialtyid: string,
    image: string,
}

const eventSchema = new Schema({

    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: Object,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    dni: {
        type: String,
        default: null
    },
    colegiatura: {
        type: String,
        default: null
    },
    specialtyid: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }

})


export default model<IDoctor>('Doctor', eventSchema)

