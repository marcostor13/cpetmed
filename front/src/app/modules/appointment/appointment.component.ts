import { Component, OnInit } from '@angular/core';
import { CAppointment } from './models/appointment';
import { SubSink } from 'subsink';
import { IResponseApi, IResponseFront } from 'src/app/models/responses';
import { AppointmentService } from './services/appointment.service';
import { ConfirmationService, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { CUser } from 'src/app/models/user';
import { UserService } from '../user/services/user.service';
import { CFormUser } from '../home/models/form-user';
import { SpecialtyService } from '../specialty/services/specialty.service';
import { CSpecialty } from '../specialty/models/specialty';
import { CDoctor } from '../doctor/models/doctor';
import { CCalendar, CCalendarFormat, CListHours } from '../calendar/models/calendar';
import { DoctorService } from '../doctor/services/doctor.service';
import { CalendarService } from '../calendar/services/calendar.service';
import { HomeService } from '../home/services/home.service';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  public subs = new SubSink()
  items: CAppointment[]
  response: IResponseFront = new IResponseFront()
  form: CAppointment = new CAppointment
  displayModalEditPatient: boolean = false
  displayModalEditAppointment: boolean = false
  displayModalAppointment: boolean = false
  user: CUser
  currentAppointment: CAppointment
  currentPatient: CFormUser
  specialtyid: string = ''
  doctorid: string = ''
  date: string = ''
  hour: string = ''
  specialties: CSpecialty[]
  doctors: CDoctor[]
  dataCalendarDoctor: CCalendarFormat[]
  hours: CListHours[]
  dataCalendarDoctor2: CCalendar[]

  constructor(
    private general: GeneralService,
    private userService: UserService,
    private appointmentService: AppointmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private calendarService: CalendarService,
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.validateSession()
    this.getData()
    this.general.isLoad('0')
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  validateSession() {
    this.user = this.authService.isLoginUser()
  }

  getData() {
    this.subs.add(
      this.appointmentService.get().subscribe((response: IResponseApi) => {
        this.general.c('Get', response)
        this.items = [...response.data]
      })
    )
  }  

  confirm(event: Event, appointment: CAppointment) {
    this.confirmationService.confirm({
      target: event.target,
      message: "¿Segúro que desea eliminar?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        this.delete(appointment);
      },
      reject: () => {
        // Nothing
      }
    });
  }

  editPatientData(appointmentData: CAppointment) {
    this.currentAppointment = appointmentData
    this.displayModalEditPatient = true
  }

  editAppointmentData(appointmentData: CAppointment) {

    this.specialtyid = ''
    this.doctorid = ''
    this.date = ''
    this.hour = ''

    this.getSpecialties()
    this.currentAppointment = appointmentData
    this.displayModalEditAppointment = true
  }


  delete(item:CAppointment) {    
      this.general.isLoad('1')
      this.subs.add(
        this.appointmentService.delete(item).subscribe((response: IResponseApi) => {
          this.general.isLoad('0')
          this.getData()
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cita eliminada' });         
        }, error => {
          this.general.isLoad('0')
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
      )   
  }

  save() {  
    this.general.isLoad('1')
    this.subs.add(
      this.appointmentService.updateAppointment(this.currentAppointment).subscribe((response: IResponseApi) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message });
        this.getData()
      }, error => {
        this.general.isLoad('0')
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      })
    )    
  }


  getNameById(id:string, array: Array<any>){
    let res:any = false
    array.map((item:any)=>{
      if (item._id === id){
        res = item.name
      }
    })
    return res
  }  


  updateAppointmentData(){

    if (this.specialtyid && this.doctorid && this.date && this.hour){
      const newAppointmentData = cloneDeep(this.currentAppointment)

      newAppointmentData.specialtyid = this.specialtyid
      newAppointmentData.specialty = this.getNameById(this.specialtyid, this.specialties)
      newAppointmentData.doctorid = this.doctorid
      newAppointmentData.doctor = this.getNameById(this.doctorid, this.doctors)
      newAppointmentData.date = this.date
      newAppointmentData.hour = this.hour

      const data = {
        currentAppointment: this.currentAppointment,
        newAppointmentData: newAppointmentData
      }

      this.general.isLoad('1')
      this.subs.add(
        this.appointmentService.updateAppointmentData(data).subscribe((response: IResponseApi) => {
          this.general.isLoad('0')
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message });
          this.getData()
        }, error => {
          this.general.isLoad('0')
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
      )
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe completar todos los datos' });
    }

  }


  //UPDATE APPOINTMENT DATA

  getSpecialties() {
    this.general.isLoad('1')
    this.subs.add(
      this.specialtyService.get().subscribe((response: IResponseApi) => {
        this.specialties = response.data
        this.general.isLoad('0')
      }, error => {
        this.general.isLoad('0')
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      })
    )
  }

  getDoctorsBySpecialties() {    
    if (this.specialtyid !== '') {
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

  getDoctorCalendar() {
   
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

  getHours() {
    this.hours = this.homeService.getHours(this.date, this.dataCalendarDoctor2)
    this.general.c('HoURS', this.hours)
  }

}
