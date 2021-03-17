import { model, Schema, Document } from 'mongoose'


export interface IList extends Document {
    id: string,
    name: string,
    companyID: string,
    date: Date
}


const listSchema = new Schema({

    name: {
        type: String,
        required: true,
    }, 
    companyID: {
        type: String,
        required: true,
    },   
    date: {
        type: Date,
        default: new Date()
    }

})


export default model<IList>('List', listSchema)