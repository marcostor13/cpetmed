import { Request, Response } from "express";
import Calendar, { ICalendar } from "../models/calendar";


const Model = Calendar
const title = 'Calendario'

export const save = async (req: Request, res: Response) => {
    const { date, hours, doctorId } = req.body
    await hours.map(async (hour:any)=>{
        const reg: any = Model.findOne({ doctorId: doctorId, hour: hour.hour, date: date})
        if (reg._id){
            Model.findOneAndUpdate({ _id: reg._id }, req.body, { new: true }, (err, event) => {
                if (err) {
                    console.log('ERROR', err)
                    res.status(501).json({
                        message: `Error al actualizar ${title}`,
                        data: null
                    })
                }
            })            
        }else{            
            const newCalendarReg: ICalendar = new Model({
                doctorId: doctorId,
                date: date,
                hour: hour.hour,
                inactive: hour.inactive
            })
            await newCalendarReg.save()
        }
        
    })

    res.status(200).json({
        message: `${title} Cread@`,
        data: null
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


export const getByDoctorID = (req: Request, res: Response) => {
    Model.find({ doctorId: req.params.doctorid}, (err, event) => {
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
    await Model.remove({ _id: req.params.id }, (err) => {
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

