import { Component, OnInit } from '@angular/core';
import { CDoctor } from './models/doctor';
import { SubSink } from 'subsink';
import { IResponseApi, IResponseFront } from 'src/app/models/responses';
import { DoctorService } from './services/doctor.service';
import { ConfirmationService, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { CUser } from 'src/app/models/user';
import { UserService } from '../user/services/user.service';
import { cloneDeep } from 'lodash-es';
import { SpecialtyService } from '../specialty/services/specialty.service';
import { CSpecialty } from '../specialty/models/specialty';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  public subs = new SubSink()
  items: CDoctor[]
  response: IResponseFront = new IResponseFront()
  form: CDoctor = new CDoctor
  displayModal: boolean = false
  user: CUser
  currentDoctor: CDoctor
  specialties: CSpecialty[]

  constructor(
    private general: GeneralService,
    private userService: UserService,
    private doctorService: DoctorService,
    private messageService: MessageService,
    private authService: AuthService,
    private specialtyService: SpecialtyService
  ) { }

  ngOnInit(): void {
    this.validateSession()
    this.getDoctors()
    this.getSpecialties()
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
  }

  validateSession() {
    this.user = this.authService.isLoginUser()
  }

  getDoctors(){
    this.subs.add(
      this.userService.getUsers().subscribe((response: IResponseApi)=>{
        this.general.c('GetDoctors', response)
        this.items = cloneDeep(response.data.filter((user:CUser) => user.role === 'Doctor' ))
      })
    )
  }

  getSpecialties() {
    this.subs.add(
      this.specialtyService.get().subscribe((response: IResponseApi) => {
        this.general.c('getSpecialties', response)
        this.specialties = response.data
      })
    )
  }

  validateForm(){

    let invalid = false
    if (!this.form.name) {
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete el nombre' });
    }   
    return invalid

  }



  getData(item:any){

    this.subs.add(
      this.doctorService.getDoctorInfo(item.email).subscribe((response: IResponseApi) => { 
        this.general.c('Get data', response.data)       
        if(response?.data?.length > 0){
          this.form = response.data[0]
        }else{
          this.form.name = item.name
          this.form.email = item.email
        }
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      })
    )    
    this.displayModal = true
  }
  

  save(){

    if (!this.validateForm()){
      this.subs.add(
        this.doctorService.saveDoctorInfo(this.form).subscribe((response: IResponseApi)=>{        
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message });    
          this.getDoctors()
        }, error =>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
      )
    }
    
  }

}
