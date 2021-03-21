import { Component, OnInit } from '@angular/core';
import { GeneralService } from '@services/general.service';
import { MessageService } from 'primeng/api';
import { SubSink } from 'subsink';
import { CCalendar, CCalendarFormat } from '../calendar/models/calendar';
import { CalendarService } from '../calendar/services/calendar.service';
import { CDoctor } from '../doctor/models/doctor';
import { DoctorService } from '../doctor/services/doctor.service';
import { CSpecialty } from '../specialty/models/specialty';
import { SpecialtyService } from '../specialty/services/specialty.service';
import { IResponseApi } from './../../models/responses';
import * as moment from 'moment';
import { CListHours } from './../calendar/models/calendar';
import { CFormUser } from './models/form-user';
import { HomeService } from './services/home.service';

moment.locale('es')

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subs = new SubSink()
  step: number = 1
  specialtyid: string = ''
  specialties: CSpecialty[]
  doctorid: string = ''
  doctors: CDoctor[]
  dataCalendarDoctor: CCalendarFormat[]
  date: string = ""
  hours: CListHours[]
  hour: string = ''
  stepType: string = ''
  dataCalendarDoctor2: CCalendar[]
  form: CFormUser = new CFormUser()
  

  constructor(
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private general: GeneralService,
    private messageService: MessageService,
    private calendarService: CalendarService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.getSpecialties()
    this.general.isLoad('0')
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
  }

  getSpecialties(){
    this.general.isLoad('1')
    this.subs.add(
      this.specialtyService.get().subscribe((response: IResponseApi)=>{       
        this.specialties = response.data
        this.general.isLoad('0')        
      }, error => {
        this.general.isLoad('0')        
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      })
    )
  }

  getDoctorsBySpecialties() {    
    this.reset('specialty')
    if (this.specialtyid !== ''){
      this.general.isLoad('1')
      this.subs.add(
        this.doctorService.getDoctorBySpecialty(this.specialtyid).subscribe((response: IResponseApi) => {
          this.general.c('getDoctorsBySpecialties', response.data)
          if (response.data?.length === 0) {         
            this.messageService.add({ severity: 'error', summary: 'Mensaje', detail: 'No hay doctores disponibles para esta especialidad' });
          }
          this.doctors = response.data
          this.general.isLoad('0')          
        }, error => {
          this.general.isLoad('0')
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
      )
    }
  }

  getDoctorCalendar(){
    this.reset('doctor')
    if (this.doctorid !== '') {
      this.general.isLoad('1')
      this.subs.add(
        this.calendarService.getDataCalendarDoctor(this.doctorid).subscribe((response: IResponseApi) => {
          this.general.c('getDoctorCalendar', response)
          if (response.data?.length === 0) {
            this.messageService.add({ severity: 'error', summary: 'Mensaje', detail: 'Error al traer la data del doctor, comuníquese con la clínica' });
          }
          this.dataCalendarDoctor = this.calendarService.formatArrayCalendar(response.data)
          this.dataCalendarDoctor2 = response.data
          this.general.isLoad('0')   
        }, error => {
          this.general.isLoad('0')
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
      )
    }
  }

  getHours(){
    this.reset('date')
    this.hours = this.homeService.getHours(this.date, this.dataCalendarDoctor2)
    this.general.c('HoURS', this.hours )
  }


  getFormatDate(date: any) {
    return moment(new Date(date)).format("YYYY-MM-DD")
  }



  reset(type){
    this.stepType = type
    switch (type) {
      case 'specialty':
        this.doctorid = ''
        this.doctors = null
        this.dataCalendarDoctor = null
        this.date = ''
        this.hours = null
        this.hour = ''        
        this.step = 1
        break;
      case 'doctor':      
        this.dataCalendarDoctor = null
        this.date = ''
        this.hours = null
        this.hour = ''        
        this.step = 2
        break;
      case 'date':        
        this.hours = null
        this.hour = ''        
        this.step = 2
        break;
      case 'hour':
        this.step = 3        
        break;
    
      default:
        break;
    }
  }

  validateForm() {

    let invalid = false
    if (!this.form.firstname) {
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete el nombre' });
    }
    if (!this.form.lastname) {
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete el nombre' });
    }
    if (!this.form.dni && this.form.dni.length < 8) {
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El Documento debe tener mínimo 8 caracteres' });
    }
    if (!this.form.email || !this.general.validateEmail(this.form.email)) {
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Compruebe su email' });
    }
    if (!this.form.phone && this.form.phone.length < 9) {
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El teléfono debe tener el menos 9 dígitos' });
    }
    if (!this.form.dateofbirth) {
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe ingresar su fecha de nacimiento' });
    }

    return invalid

  }

  save(){

    if(!this.validateForm()){
      this.general.isLoad('1')
      const data = {
        specialtyid: this.specialtyid,
        doctorid: this.doctorid,
        date: this.date,
        hour: this.hour,
        dataUser: this.form
      }

      this.subs.add(
        this.homeService.save(data).subscribe((response: IResponseApi)=>{
          this.general.c('Save appointment', response)
          this.general.isLoad('0')
          this.reset('specialty')
          this.messageService.add({ severity: 'success', summary: 'Mensaje', detail: response.message });
          setTimeout(() => {
            window.location.href = 'http://cpetmed.com'
          }, 5000)
          this.subs.add(
            this.homeService.sendMailPatient(data).subscribe((response: IResponseApi) => {
              this.general.c('Save appointment email patient', response)
              this.subs.add(
                this.homeService.sendMailAdmin(data).subscribe((response: IResponseApi) => {
                  this.general.c('Save appointment email admin', response)                 
                }, error => {
                  this.general.isLoad('0')
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
                })              )
            }, error => {
              this.general.isLoad('0')
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            })
          )          
        }, error => {
          this.general.isLoad('0')
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
      )

 
    }

  }


  

}
