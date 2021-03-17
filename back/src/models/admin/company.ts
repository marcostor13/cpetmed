import { model, Schema, Document } from 'mongoose'


export interface ICompany extends Document {
    id: string,
    legalname: string,
    comercialname: string,
    phone: string,
    address: string,
    date: Date
}


const companySchema = new Schema({   

    legalname: {
        type: String,
        required: true,
    },
    comercialname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date()
    }
    

})


export default model<ICompany>('Company', companySchema)

