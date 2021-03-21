import { Request, Response } from "express";
import Appointment, { IAppointment } from "../models/appointment";
import Doctor from "../models/doctor";
import Specialty from "../models/specialty";
import Calendar from "../models/calendar";

const Model = Appointment
const title = 'Cita'

export const save = async (req: Request, res: Response): Promise<Response> => {
    const { _id, ...reqBody } = req.body
    const doctor = await Doctor.findById(reqBody.doctorid)
    const specialty = await Specialty.findById(reqBody.specialtyid)   
    const dataAppointment = { ...reqBody, specialty: specialty?.name, doctor: doctor?.name}

    const newElement: IAppointment = new Model(dataAppointment)
    await newElement.save()
    
    Calendar.findOneAndUpdate({ doctorId: reqBody.doctorid, date: reqBody.date, hour: reqBody.hour  }, {inactive: true}, { new: true }, (err, event) => {
        if (err) {
            console.log('Error', err)
        }
    })  

    return res.status(200).json({
        message: `Su cita fue creada, gracias por confiar en nosotros.`,
        data: newElement
    })

    
}

export const updateAppointmentData = async (req: Request, res: Response) => {
    const { currentAppointment, newAppointmentData } = req.body

    Calendar.findOneAndUpdate({ doctorId: currentAppointment.doctorid, date: currentAppointment.date, hour: currentAppointment.hour }, { inactive: false }, { new: true }, (err, event) => {
        if (err) {
            console.log('Error', err)
        }
    })

    Calendar.findOneAndUpdate({ doctorId: newAppointmentData.doctorid, date: newAppointmentData.date, hour: newAppointmentData.hour }, { inactive: true }, { new: true }, (err, event) => {
        if (err) {
            console.log('Error', err)
        }
    })

    Model.findOneAndUpdate({ _id: newAppointmentData._id }, newAppointmentData, { new: true }, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al actualizar ${title}`,
                data: null
            })
        }
        res.status(200).json({
            message: `${title} actualizad@`,
            data: event
        })
    })
}




export const get = async (req: Request, res: Response) => {
    Model.find({}, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            })
        }
        res.status(200).json({
            message: '',
            data: event
        })
    })
}


export const getByID = (req: Request, res: Response) => {
    Model.findById(req.params.id, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}`,
                data: null
            })
        }
        res.status(200).json({
            message: '',
            data: event
        })
    })
}



export const update = (req: Request, res: Response) => {
    Model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al actualizar ${title}`,
                data: null
            })
        }
        res.status(200).json({
            message: `${title} actualizad@`,
            data: event
        })
    })
}

export const del = async (req: Request, res: Response) => {
    const reqBody = req.body
    console.log('REQ', reqBody)

    Calendar.findOneAndUpdate({ doctorId: reqBody.doctorid, date: reqBody.date, hour: reqBody.hour }, { inactive: false }, { new: true }, (err, event) => {
        if (err) {
            console.log('Error', err)
        }
    })
    await Model.remove({ _id: reqBody._id }, (err) => {
        if (err) {
            res.status(501).json({
                message: `Error al eliminar ${title}`,
                data: null
            })
        }

    })
    return res.status(200).json({
        message: `${title} eliminad@`,
        data: null
    })
}

