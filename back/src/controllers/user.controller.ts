import { Request, Response } from "express";
import User, { Iuser } from "../models/user";
import * as jwt from "jsonwebtoken";
import * as keys from '../keys'

function createToken(user: Iuser){
    return jwt.sign({ id: user.id, email: user.email }, keys.mongodb.jwtSecret,{
        expiresIn: 86400
    })
}


export const singUp = async (req:Request, res:Response):Promise<Response> => {
    const {name, role, email, password} = req.body
    if (!name || !role || !email || !password){
        return res.status(400).json({message: 'Debe completar todos los datos'})        
    }
    const user = await User.findOne({email: email})
    if(user){
        return res.status(400).json({message: 'El usuario ya existe'})
    }
    const newUser:Iuser = new User(req.body)
    await newUser.save()  
    return res.status(200).json(newUser)
}

export const singIn = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Debe completar todos los datos' })
    }

    const user = await User.findOne({ email: email })
    if(!user){
        return res.status(400).json({ message: 'El usuario no existe' })
    }

    const isEqualPassword = await user.comparePassword(password)
    if(isEqualPassword){
        return res.status(200).json({ 
            _id: user._id,
            name: user.name || '',
            email: user.email,
            role: user.role || '',
            token: createToken(user) 
        })
    }
    return res.status(400).json({ message: 'El correo o la contraseña son incorrectas' })

}


const Model = User
const title = 'Usuario'

export const save = async (req: Request, res: Response): Promise<Response> => {
    const { _id, date, ...reqBody } = req.body

    const user:Iuser[] = await Model.find({email: reqBody.email})
    
    if (user.length > 0) {
        return res.status(501).json({
            message: `El ${title} ya existe, elija otro`,
            data: null
        })
    }else{
        const newElement: Iuser = new Model(reqBody)
        await newElement.save()
        return res.status(200).json({
            message: `${title} Cread@`,
            data: newElement
        })       
    }
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

