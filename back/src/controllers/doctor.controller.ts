import { Request, Response } from "express";
import Doctor, { IDoctor } from "../models/doctor";


const Model = Doctor
const title = 'Doctor'

export const save = async (req: Request, res: Response): Promise<Response> => {
    const { _id, date, ...reqBody } = req.body
    const newElement: IDoctor = new Model(reqBody)
    await newElement.save()
    return res.status(200).json({
        message: `${title} Cread@`,
        data: newElement
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

export const getBySpecialty = (req: Request, res: Response) => {
    Model.find({ specialtyid: req.params.specialtyid }, (err, event) => {
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

export const getByEmail = (req: Request, res: Response) => {
    Model.find({ email: req.params.email }, (err, event) => {
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

