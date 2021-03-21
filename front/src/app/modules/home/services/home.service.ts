import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IDataApi } from 'src/app/models/dataapi';
import { GeneralService } from '@services/general.service';
import * as moment from 'moment';
import { CCalendar, CCalendarFormat, CListHours } from '../../calendar/models/calendar';

moment.locale('es')

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  model: string = 'appointment'

  constructor(
    private api: ApiService,
    private general: GeneralService,
  ) { }

  save(dataHome: any) {
    const data: IDataApi = {
      service: dataHome._id ? `update-${this.model}` : `save-${this.model}`,
      type: dataHome._id ? 'patch' : 'post',
      data: dataHome
    }
    return this.api.api(data)
  }

  sendMailPatient(dataHome: any) {
    const data: IDataApi = {
      service: `send-email-patient`,
      type: 'post',
      data: dataHome
    }
    return this.api.api(data)
  }

  sendMailAdmin(dataHome: any) {
    const data: IDataApi = {
      service: `send-email-admin`,
      type: 'post',
      data: dataHome
    }
    return this.api.api(data)
  }
  

  get() {
    const data: IDataApi = {
      service: `get-${this.model}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

  delete(userid: string) {
    const data: IDataApi = {
      service: `delete-${this.model}/${userid}`,
      type: 'delete',
      data: null
    }
    return this.api.api(data)
  }

  getHours(date:string, dataCalendar: CCalendar[]){    
    let res:CListHours[] = []
    dataCalendar.map((data: CCalendar)=>{
      if(data.date === date){
        res = [...res, {hour: data.hour, inactive: data.inactive}]
      }
    })
    return res
  }
  

  

  

  
  


  

}
