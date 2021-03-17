import { Request, Response } from "express";
import URL from "../models/url";
import COMPANIES_USERS from "../models/admin/companies_users";
import List, { IList } from "../models/list";
import {  cloneDeep } from 'lodash';

const title = 'URL'
const domain = 'http://localhost:4200'
// const domain = 'https://binter.ml'

const ramdomName = (length:number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const issetCompanyNameRamdom = async (res: Response) => {
    let response:any = false
    let text = ramdomName(5)

    for (let i = 0; i < 10; i++) {
        await URL.find({ text }, (err, event) => {
            if (err) {
                res.status(501).json({
                    message: `Error al obtener ${title}s`,
                    data: null
                })
            }            
            if (!event || event.length === 0) {
                response = text
            }else{
                text = ramdomName(5)
            }
        })
        if(response){
            break
        }
    }
    return response
}



export const saveURL = async (req: Request, res: Response): Promise<Response> => {
    const { _id, ...reqBody } = req.body
    
    if (!reqBody.text){
        reqBody.text = cloneDeep(await issetCompanyNameRamdom(res)) 
    }

    let shortURL = ''

    //GET shortURL 
    
    if (reqBody.companyName){        
        shortURL = `${domain}/${reqBody.companyName}/${reqBody.text}`
    }else{
        shortURL = `${domain}/${reqBody.text}`
    }

    let urlRedirect = ''

    //GET URL
    switch (reqBody.typeURL) {
        case 'URL':
            urlRedirect = reqBody.url
            console.log('URL', reqBody.url)
            break;
        case 'Landing':
            urlRedirect = `${domain}/landings/${reqBody.landingID}`
            break;
        case 'Whatsapp':
            reqBody.whatsappNumber = reqBody.whatsappNumber.replace('+', reqBody.whatsappNumber)
            urlRedirect = `https://wa.me/${reqBody.whatsappNumber}?text=${encodeURI(reqBody.whatsappText)}`
            break;  
        case 'FromFile':
            break;  
        default:
            res.status(501).json({
                message: `Error al obtener el tipo de url`,
                data: null
            })
            break;
    }

    const params: any = {}
    reqBody.parameters.map((param: any) => {
        params[param.name] = param.value
    })
    
    //SAVE URL
    const payload = {
        code: reqBody.text.toLowerCase(),
        companyName: reqBody.companyName.toLowerCase(),
        longURL: urlRedirect,
        shortUrl: shortURL,
        companyID: reqBody.companyID,
        landingID: reqBody.landingID,
        typeURL: reqBody.typeURL,
        parameters: params
    }
    const newURL = new URL(payload)
    await newURL.save()
    return res.status(200).json({
        message: `${title} Cread@`,
        data: newURL
    })
}

export const saveMultipleURL = async (req: Request, res: Response): Promise<Response> => {
    const { _id, ...reqBody } = req.body

    const newList: IList = new List({
        name: reqBody.listName,
        companyID: reqBody.companyID
    })
    const list = await newList.save()  

    let urlRedirect = ''

    //GET URL
    switch (reqBody.typeURL) {
        case 'URL':
            urlRedirect = reqBody.url
            break;
        case 'Landing':
            urlRedirect = `${domain}/landings/${reqBody.landingID}`
            break;
        case 'Whatsapp':
            reqBody.whatsappNumber = reqBody.whatsappNumber.replace('+', reqBody.whatsappNumber)
            urlRedirect = `https://wa.me/${reqBody.whatsappNumber}?text=${encodeURI(reqBody.whatsappText)}`
            break;  
        case 'FromFile':
            break;        
        default:
            res.status(501).json({
                message: `Error al obtener el tipo de url`,
                data: null
            })
            break;
    }

    await reqBody.dataExcel.map(async (data:any)=>{   
        
        if (reqBody.typeURL==='FromFile'){
            urlRedirect = data[reqBody.fieldURL.name]
        }

        reqBody.text = cloneDeep(await issetCompanyNameRamdom(res))   
        let shortURL = ''

        //GET shortURL 
        if (reqBody.companyName) {
            shortURL = `${domain}/${reqBody.companyName}/${reqBody.text}`
        } else {
            shortURL = `${domain}/${reqBody.text}`
        }

        const params:any = {}
        reqBody.parameters.map((param:any)=>{            
            params[param.name] = data[param.name]
        })

        const payload = {
            code: reqBody.text.toLowerCase(),
            companyName: reqBody.companyName.toLowerCase(),
            longURL: urlRedirect,
            shortUrl: shortURL,
            companyID: reqBody.companyID,
            typeURL: reqBody.typeURL,
            landingID: reqBody.landingID,
            parameters: params,
            listID: list._id,
            listName: list.name
        }
        const newURL = new URL(payload)
        await newURL.save()   
    })

    return res.status(200).json({
        message: `${title} Cread@`,
        data: list._id
    })

    
}


export const saveList = async (req: Request, res: Response) => {
    const { _id, ...reqBody } = req.body
    const newEvent: IList = new List(reqBody)
    await newEvent.save()
    return res.status(200).json({
        message: `${title} Cread@`,
        data: newEvent
    })
}

export const issetCompanyNameAndText = async (req: Request, res: Response) => {
    const { companyName, text } = req.body

    let query;
    if(companyName){
        query = { companyName: companyName.toLowerCase(), code: text.toLowerCase() }
    }else{
        query = { code: text.toLowerCase() }
    }

    URL.find(query, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            })
        }
        console.log(event)
        res.status(200).json({
            message: '',
            data: event
        })
    })  
}

export const getListsBYUserID = async (req: Request, res: Response) => {

    COMPANIES_USERS.find({ userid: req.params.userID }, async (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            })
        }
        if(event.length > 0){
            let companies:any = []
            event.map(async (companies_user)=>{
                companies = [...companies, companies_user.companyid]
            })            
            await List.find({ companyID: companies }, (err, event) => {
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
            
        }else{
            res.status(200).json({
                message: '',
                data: event
            })
        }
    })    
}



export const getURLsBYUserID = async (req: Request, res: Response) => {

    COMPANIES_USERS.find({ userid: req.params.userID }, async (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            })
        }
        if(event.length > 0){
            let companies:any = []
            event.map(async (companies_user)=>{
                companies = [...companies, companies_user.companyid]
            })
            console.log('companies', companies)
            await URL.find({ companyID: companies }, (err, event) => {
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
            
        }else{
            res.status(200).json({
                message: '',
                data: event
            })
        }
    })    
}

export const getByID = async (req: Request, res: Response) => {
    URL.find({ _id: req.params.id }, (err, event) => {
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

export const getURLsBYCompanyID = async (req: Request, res: Response) => {
    URL.find({ companyID: req.params.companyID}, (err, event) => {
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

export const getURLsBYCompanyIDAndCode = async (req: Request, res: Response) => {
    URL.find({ companyName: req.params.companyID.toLowerCase(), code: req.params.code.toLowerCase() }, (err, event) => {
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

export const getURLsBYCode = async (req: Request, res: Response) => {
    URL.find({ code: req.params.code.toLowerCase() }, (err, event) => {
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




export const getURLsBYListID = (req: Request, res: Response) => {
    URL.find({ listID: req.params.listID}, (err, event) => {
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


export const delList = async (req: Request, res: Response) => {
    await URL.remove({ listID: req.params.listID }, (err) => {
        if (err) {
            res.status(501).json({
                message: `Error al eliminar ${title}`,
                data: null
            })
        }
    })

    await List.remove({ _id: req.params.listID }, (err) => {
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


export const delURL = async (req: Request, res: Response) => {
    await URL.remove({ _id: req.params.urlID }, (err) => {
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




