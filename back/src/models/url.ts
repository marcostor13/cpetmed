import { model, Schema, Document } from 'mongoose'


export interface IURL extends Document {
    id: number,    
    url: string,
    text: string,
    whatsappNumber: string,
    whatsappText: string,
    companyName: string,
    shortUrl: string,
    landingID: string,
    parameters: any,
    listID: string,
    longURL: string,
    companyID:string,
    typeURL:string,
    code: string,
    listName: string,
    fieldURL:string,
    date: Date
}

const eventSchema = new Schema({

    code:{
        type: String,
        required: true,
        default: null
    },
    companyName: {
        type: String,
        default: null        
    },
    longURL: {
        type: String,
        required: true,
        default: null
    },
    shortUrl: {
        type: String,
        required: true,
        default: null
    },
    companyID: {
        type: String,
        required: true,
        default: null
    },
    typeURL: {
        type: String,
        required: true,
        default: null
    },
    fieldURL:{
        type: String,
        default: null        
    },
    parameters: {
        type: Object,
        default: null        
    },
    listID: {
        type: String,
        default: null
    },
    landingID: {
        type: String,
        default: null
    },
    listName: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: new Date()
    }

})


export default model<IURL>('URL', eventSchema)

