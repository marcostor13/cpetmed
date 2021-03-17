import { Request, Response } from "express";
import Event from "../models/events";
import Landing from "../models/admin/landing";
import CompaniesUsers from "../models/admin/companies_users";
import URL from "../models/url";
import List from "../models/list";


export const getData = async (req: Request, res: Response) => {
    const response:any = {}
    const userid = req.params.userid
    const events = await  Event.find({ userID: userid })
    const companiesUsers = await CompaniesUsers.find({ userid: userid })
    let companies:any = []
    companiesUsers.map((comUsers:any)=>{
        companies = [...companies, comUsers.companyid]
    })
    const landings = await Landing.find({ companyid: companies })
    const lists = await List.find({ companyID: companies })
    const urls = await URL.find({ companyID: companies })
    response['events'] = events
    response['landings'] = landings
    response['lists'] = lists
    response['urls'] = urls
    return res.status(200).json({
        message: '',
        data: response
    })
}

