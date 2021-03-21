import { model, Schema, Document } from 'mongoose'


export interface ISpecialty extends Document {
    _id: string,
    name: string,  
}

const eventSchema = new Schema({

    name: {
        type: String,
        default: null
    },   

})


export default model<ISpecialty>('Specialty', eventSchema)

