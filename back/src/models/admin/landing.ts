import { model, Schema, Document } from 'mongoose'


export interface IElement {
    name: string,
    type: string,
    width: string
    element: string,
    class: string,
    redirect: string,
    href: string,
    alt: string,
    src: string,
    email: string,
    phone: string,
    text: string,
    color: string,
    fontSize: string,
    fontWeight: string,
    inputs: IInput[],  
    icons: IICon[],
    borderWidth: string,
    borderColor: string,
    backgroundColor: string,
    textColor: string,
    buttonBackgroundColor: string,
    buttonTextColor: string,
    buttonBorderColor: string,
    buttonBorderWidth: string,
    successMessage: string,
    labelColor:string,
    labelFontSize:string,
    label : string,
    minToday : boolean,
    inline : boolean,
    maxDate: Date
    typeLink: string,
    autoPlay: boolean
}

export interface IInput {
    name: string,
    placeholder: string,
    class: string,
    disabled: boolean,
    index: number,
    borderColor: string,
    backgroundColor: string,
    textColor: string,
    labelClass: string,
    borderWidth: string,
    required: boolean,
}

export interface ILanding extends Document {
    id: number,
    companyid: any,
    name: string,
    backgroundURL: string,
    backgroundName: string,
    backgroundColor: string,
    logoURL: string,    
    logoName: string,
    widthLogo: number,
    opacity: number,
    validationRut: boolean,
    validationRutDigits: number,
    elements: IElement[],
    date: Date
}

export interface IICon {
    name: string,
    redirect: string,
    class: string,
    index: number,
    width: string,
    image: string,
}


const landingSchema = new Schema({

    companyid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    backgroundName: {
        type: String,        
    },
    backgroundURL: {
        type: String
    },
    backgroundColor: {
        type: String
    },
    logoName: {
        type: String
    },
    logoURL: {
        type: String
    },
    widthLogo: {
        type: Number
    },
    opacity: {
        type: Number
    },
    validationRut: {
        type: Boolean
    },
    validationRutDigits: {
        type: Number
    },
    elements: {
       type: Array
    },
    date: {
        type: Date,
        default: new Date()
    }
    
})


export default model<ILanding>('Landing', landingSchema)

