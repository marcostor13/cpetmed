import { Component, OnInit, ViewChild } from '@angular/core';
import { CCalendar, CCalendarFormat, CListHours } from './models/calendar';
import { SubSink } from 'subsink';
import { IResponseApi, IResponseFront } from 'src/app/models/responses';
import { CalendarService } from './services/calendar.service';
import { MessageService } from 'primeng/api';
import { GeneralService } from 'src/app/services/general.service';
import { DoctorService } from './../doctor/services/doctor.service';
import { CDoctor } from '../doctor/models/doctor';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import * as moment from 'moment';

moment.locale('es')

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {


  public subs = new SubSink()
  response: IResponseFront = new IResponseFront()  
  displayModal: boolean = false
  dataCalendarDoctor: CCalendar[]
  dataCalendarDoctorFormat: CCalendarFormat[]
  doctors: CDoctor[]
  doctorId: string = ''
  date = new Date();
  mode: NzCalendarMode = 'month'
  listHours: CListHours[]
  selectedHours: CListHours[] = []

  constructor(
    private general: GeneralService,
    private messageService: MessageService,
    private calendarService: CalendarService,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.getDoctors()
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
  }


  getDataCalendarDoctor(){
    if (this.doctorId){
      this.subs.add(
        this.calendarService.getDataCalendarDoctor(this.doctorId).subscribe((response: IResponseApi)=>{
          if(response.data?.length > 0){
            this.dataCalendarDoctor = response.data
            this.general.c('getDataCalendarDoctor', response.data)
            this.dataCalendarDoctorFormat =  this.calendarService.formatArrayCalendar(this.dataCalendarDoctor)
          }         
        })
      )
    }
  }

  getDoctors() {
    this.subs.add(
      this.doctorService.getDoctors().subscribe((response: IResponseApi) => {
        this.general.c('getDoctors', response)
        this.doctors = response.data
      })
    )
  }

  dateSelect(date: Date): void {
    
    this.displayModal = true   
    this.selectedHours = this.calendarService.getHourByDay(date, this.dataCalendarDoctor)    
    this.listHours = this.calendarService.disabledHours(this.selectedHours)
    this.general.c('SAVE listHours', this.listHours)
    this.general.c('SAVE selectedHours', this.selectedHours)

  }

  getFormatDate(date:Date) {
    return moment(new Date(date)).format("YYYY-MM-DD")
  }

   
  save(){ 

    const data = {
      date: this.getFormatDate(this.date),
      hours: this.selectedHours,
      doctorId: this.doctorId
    }
    
    this.subs.add(
      this.calendarService.save(data).subscribe((response: IResponseApi)=>{
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message });    
        this.getDataCalendarDoctor()
      }, error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      })
    )
  
    
  }

  capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  formatDate(date, format) {
    return moment(date).format(format)
  }

}


