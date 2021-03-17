import { Request, Response } from "express";
import Company, { ICompany } from "../../models/admin/company";
import User from "../../models/user";
import CompaniesUsers, { ICompaniesUsers } from './../../models/admin/companies_users';

const title = 'Empresa'

export const save = async (req: Request, res: Response): Promise<Response> => {
    const { _id, ...reqBody } = req.body
    const newCompany: ICompany = new Company(reqBody)
    const company = await newCompany.save()     
    const newCompaniesUsers: ICompaniesUsers = new CompaniesUsers({
        companyid: company._id,
        userid: req.body.userid
    }) 
    await newCompaniesUsers.save()
    return res.status(200).json({
        message: `${title} Cread@`,
        data: newCompany
    })
}

export const get = async (req: Request, res: Response) => {

    User.findById(req.params.userid, (err, user) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            })
        }
        CompaniesUsers.find({ userid: user?._id }, (err, companiesusers) => {
            if (err) {
                res.status(501).json({
                    message: `Error al obtener ${title}s`,
                    data: null
                })
            }

            const companies: string[] = []
            companiesusers.map(c => {
                companies.push(c.companyid)
            })


            Company.find({ _id: companies }, (err, company) => {
                if (err) {
                    res.status(501).json({
                        message: `Error al obtener ${title}s`,
                        data: null
                    })
                }
                res.status(200).json({
                    message: '',
                    data: company
                })
            })

        })
        
    })

    
}

export const getByID = (req: Request, res: Response) => {
    Company.findById(req.params.id, (err, company) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}`,
                data: null
            })
        }
        res.status(200).json({
            message: '',
            data: company
        })
    })
}

export const update = (req: Request, res: Response) => {
    Company.findOneAndUpdate({ _id:req.params.id}, req.body, {new:true} ,(err, company) => {
        if (err) {
            res.status(501).json({
                message: `Error al actualizar ${title}`,
                data: null
            })
        }
        res.status(200).json({
            message: `${title} actualizad@`,
            data: company
        })
    })
}

export const del = async (req: Request, res: Response) => {
    await CompaniesUsers.remove({ companyid: req.params.id }, (err) => {
        if (err) {
            res.status(501).json({
                message: `Error al eliminar ${title}`,
                data: null
            })
        }

    })    
    await Company.remove({ _id: req.params.id }, (err) => {
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


