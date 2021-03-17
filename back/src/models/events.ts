import { model, Schema, Document } from 'mongoose'


export interface IEvent extends Document {
    id: number,
    landingid: string,    
    type: string,
    data: object, 
    date: Date,  
    urlID: string, 
    userID: string,
    companyID: string,
    shortURL: string,
    url: string,
    listID: string,
}

const eventSchema = new Schema({

    landingid: {
        type: String,
        default: null        
    },
    type: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        default: null        
    },
    urlID:{
        type: String,
        default: null
    },
    userID: {
        type: String,
        default: null
    },
    companyID: {
        type: String,
        default: null
    },
    shortURL: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: new Date()
    },
    listID:{
        type: String,
        default: null
    }

})


export default model<IEvent>('Event', eventSchema)

