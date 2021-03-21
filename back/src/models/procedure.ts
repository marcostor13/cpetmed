import { model, Schema, Document } from 'mongoose'


export interface IProcedure extends Document {
    _id: string,
    name: string,
}

const eventSchema = new Schema({

    name: {
        type: String,
        default: null
    },

})


export default model<IProcedure>('Procedure', eventSchema)

