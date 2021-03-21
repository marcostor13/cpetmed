import { model, Schema, Document } from 'mongoose'



export interface ICalendar extends Document {
    _id: string,
    doctorId: string,
    date: string,
    hour: string,
    inactive: boolean
}

const eventSchema = new Schema({
    doctorId: {
        type: String,
        required: true,
    },  
    date: {
        type: String,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    inactive: {
        type: Boolean,
        required: true,
    }
})


export default model<ICalendar>('Calendar', eventSchema)

