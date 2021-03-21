import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IDataApi } from 'src/app/models/dataapi';
import { CCalendar, CListHours } from '../models/calendar';
import { GeneralService } from '@services/general.service';
import * as moment from 'moment';

moment.locale('es')

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  model: string = 'calendar'

  constructor(
    private api: ApiService,
    private general: GeneralService,
  ) { }

  save(dataCalendar) {
    const data: IDataApi = {
      service: `save-${this.model}`,
      type: 'post',
      data: dataCalendar
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
  

  getDataCalendarDoctor(element:any) {
    const data: IDataApi = {
      service: `get-calendar-by-doctorid/${element}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

  getHours(){
    const listHours: CListHours[] = [
      { 
        hour: '8:00',
        inactive: false
      },
      { 
        hour: '8:30',
        inactive: false
      },
      { 
        hour: '9:00',
        inactive: false
      },
      { 
        hour: '9:30',
        inactive: false
      },
      { 
        hour: '10:00',
        inactive: false
      },
      { 
        hour: '10:30',
        inactive: false
      },
      { 
        hour: '11:00',
        inactive: false
      },
      { 
        hour: '11:30',
        inactive: false
      },
      { 
        hour: '12:00',
        inactive: false
      },
      { 
        hour: '12:30',
        inactive: false
      },
      { 
        hour: '13:00',
        inactive: false
      },
      { 
        hour: '13:30',
        inactive: false
      },
      { 
        hour: '14:00',
        inactive: false
      },
      { 
        hour: '14:30',
        inactive: false
      },
      { 
        hour: '15:00',
        inactive: false
      },
      { 
        hour: '15:30',
        inactive: false
      },
      { 
        hour: '16:00',
        inactive: false
      },
      { 
        hour: '16:30',
        inactive: false
      },
      { 
        hour: '17:00',
        inactive: false
      },
      { 
        hour: '17:30',
        inactive: false
      },
      { 
        hour: '18:00',
        inactive: false
      },
      { 
        hour: '18:30',
        inactive: false
      },
      { 
        hour: '19:00',
        inactive: false
      },
      { 
        hour: '19:30',
        inactive: false
      },
      { 
        hour: '20:00',
        inactive: false
      },
      { 
        hour: '20:30',
        inactive: false
      },

    ]
    return listHours
  }

  formatDate(date:any){
    return moment(new Date(date)).format("YYYY-MM-DD")
  }

  formatArrayCalendar(dataCalendar: CCalendar[]){
    let tempArray = {}
    let res = []

    dataCalendar.map((data: CCalendar)=>{
      if (tempArray[data.date]){
        tempArray[data.date] = [...tempArray[data.date], { hour: data.hour, inactive: data.inactive }]
      }else{
        tempArray[data.date] = [{ hour: data.hour, inactive: data.inactive}]
      }
    })
    for (var key in tempArray) {
      res = [...res, { date: key, hours: tempArray[key] }]
    }
    return res
    
  }


  getHourByDay(date: Date, dataCalendar: CCalendar[]){
    this.general.c('dataCalendar', dataCalendar)
    if (!dataCalendar || dataCalendar?.length === 0){
      return []
    }else{
      let res: CListHours[] = []
      dataCalendar.map((dateCalendar: CCalendar)=>{
        if (dateCalendar.date === this.formatDate(date)){
          res = [...res, {hour: dateCalendar.hour, inactive: dateCalendar.inactive}]
        }
      })
      return res
    }
  }

  // //Busca si existe la fecha y atualiza lkas horas
  // updateHoursOfDay(dataHours: CDataHours, dataCalendar: CCalendar){
  //   let res:CCalendar = null
  //   let itemIndex = dataCalendar.dates.findIndex((date: CDataHours) => this.formatDate(date.date) == this.formatDate(dataHours.date))
  //   if (itemIndex > -1){
  //     dataCalendar.dates[itemIndex] = dataHours;
  //     res = dataCalendar
  //   }  
  //   return res
  // }

  //desativa las horas seleccionadas
  disabledHours(selectedHours: CListHours[]){
    let hours: CListHours[] = this.getHours()
    selectedHours.map((selectedHour: CListHours)=>{
      hours = hours.map(hour => hour.hour === selectedHour.hour ? {...hour, inactive: selectedHour.inactive } : hour);
    })
    return hours
  }

  
  


  

}
