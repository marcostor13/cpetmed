import { Request, Response } from "express";
import Event, { IEvent } from "../models/events";
import URL, { IURL } from "../models/url";


const title = 'Evento'

export const save = async (req: Request, res: Response): Promise<Response> => {
    const { _id, date, ...reqBody } = req.body   
    const newEvent: IEvent = new Event(reqBody)  
    if (reqBody.urlID) {
        const url:IURL[] = await URL.find({ _id: reqBody.urlID })
        if (url) {
            newEvent.listID = url[0].listID
        }
    }
    await newEvent.save()
    
    return res.status(200).json({
        message: `${title} Cread@`,
        data: newEvent
    })
}

export const get = async (req: Request, res: Response) => {
    Event.find({}, (err, event) => {
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
    Event.findById(req.params.id, (err, event) => {
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
    Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, event) => {
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
    await Event.remove({ _id: req.params.id }, (err) => {
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


