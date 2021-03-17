import { model, Schema, Document } from 'mongoose'


export interface ICompaniesUsers extends Document {
    id: string,
    userid: string,
    companyid: string,   
}


const companiesUsersSchema = new Schema({

    userid: {
        type: String,
        required: true,
    },
    companyid: {
        type: String,
        required: true,
    },

})


export default model<ICompaniesUsers>('CompaniesUsers', companiesUsersSchema)

