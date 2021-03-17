import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@services/general.service';
import { LandingsService } from '../admin/landings/services/landings.service';
import { SubSink } from 'subsink';
import { Landing } from '../admin/landings/models/add-landing';
import { IResponseApi } from 'src/app/models/responses';
import { cloneDeep } from 'lodash-es';
import { Ielement } from 'src/app/modules/admin/landings/models/add-landing';
import { IEmailData } from 'src/app/models/emailData';
import { environment } from 'src/environments/environment';
import { LandingService } from './services/landing.service';
import { IEvent } from './models/event';
import { IURL } from './../../../../../back/src/models/url';

@Component({
  selector: 'app-landings',
  templateUrl: './landings.component.html',
  styleUrls: ['./landings.component.scss']
})
export class LandingsComponent implements OnInit {

  private subs = new SubSink()
  id: string
  urlID: string
  params: any
  landing: Landing
  validation: boolean = false
  invalidRut: boolean = false
  form: any
  response: string
  calendar: Date; 
  eventData = new IEvent 
  url: IURL

  //MODAL
  modal: boolean = false
  message: string = ''

  constructor(
    private route: ActivatedRoute, 
    private general: GeneralService,
    private adminLandingService: LandingsService,
    private landingService: LandingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.urlID = this.route.snapshot.paramMap.get('urlID') 
    this.getDataLanding()     
    this.eventData.landingid = this.id

    
   }

  ngOnInit(): void {  
    
  }

  saveEvent(type,  data = null){
    if (data){
      this.eventData.data.dataLanding = data
    }    
    this.eventData.type = type
    this.eventData.landingid = this.id || null
    this.eventData.data.dataLanding = data || null
    this.eventData.companyID = this.landing.companyid
    this.eventData.urlID = this.urlID || null
    this.eventData.url = window.location.href || null
    this.eventData.shortURL = this.url?.shortUrl || null
    this.subs.add(
      this.landingService.saveEvent(this.eventData).subscribe()
    )
  }

  getParametersURL(){
    this.subs.add(
      this.landingService.getParameters(this.urlID).subscribe((res: IResponseApi) => {
        const url:IURL = res.data[0]
        this.url = url
        this.params= url.parameters
        this.general.c('getParametersURL', this.params)
        this.saveEvent('visit')
      })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getDataLanding(){
    this.subs.add(
      this.adminLandingService.getLandingByID(this.id).subscribe((res:IResponseApi)=>{
        this.landing = cloneDeep(res.data)
        this.validation = !this.landing.validationRut
        this.general.c(' GetDataLanding', this.landing)
        if (this.urlID) {
          this.getParametersURL()
        }        
      })
    )
  }
  
  validateRut(value:string){
    if (value && value.length === this.landing.validationRutDigits){
      this.invalidRut = false
      const rutfour = String(this.params.rut)
      if (rutfour.substr(0,this.landing.validationRutDigits) === value){
        this.saveEvent('valid-rut', value)
        this.validation = true    
      }else{
        this.saveEvent('invalid-rut', value)
        this.invalidRut = true
      }      
    }
  }

  sendForm($event:any, el:Ielement){    
    
    let data:any = {}; 
    
    for (let i = 0; i < el.inputs.length; i++) {
      const element = $event.target[i]
      data[element.id] = element.value
    }

    data = {...data, ...this.params}
    

    if(el.email){
      this.general.isLoad('1')
      const dataMail = new IEmailData
      dataMail.dest = el.email
      dataMail.data = data
      dataMail.from = environment.from
      dataMail.fromname = environment.fromname
      dataMail.subject = 'Nuevo Formulario'
      dataMail.type = '1'          
      this.subs.add(
        this.general.sendMail(dataMail).subscribe((res: IResponseApi)=>{
          this.saveEvent('send-email', dataMail)
          if (el.successMessage){
            this.response = el.successMessage
          }else{
            this.response = 'Mensaje Enviado'
          }
          this.general.isLoad('0')
        })
      )
    }
    return false;
    
  }

  getText(text){
    for (const key in this.params) {      
      const data = `(${key})`
      text = text.replaceAll(data, this.params[key])
    }    
    return text
  }

  getMinDate(minToday:boolean){
    if (minToday){
      return new Date()
    }else{
      return null
    }
  }  

  getMaxDate(maxDate: string){
    return new Date(maxDate)
  }

  sendCalendar(el: Ielement) {

    const data = { ...this.params, fecha: formatDate(this.calendar, 'dd/MM/yyyy', 'en')}        

    if (el.email) {
      this.general.isLoad('1')
      const dataMail = new IEmailData
      dataMail.dest = el.email
      dataMail.data = data
      dataMail.from = environment.from
      dataMail.fromname = environment.fromname
      dataMail.subject = 'Nuevo Calendario'
      dataMail.type = '1'
      this.subs.add(
        this.general.sendMail(dataMail).subscribe((res: IResponseApi) => {
          this.saveEvent('send-calendar', dataMail)
          if (el.successMessage) {
            this.response = el.successMessage
          } else {
            this.response = 'Mensaje Enviado'
          }
          this.general.isLoad('0')
        })
      )
    }
    return false;

  }

  redirect(url:string){
    this.saveEvent('redirect', url)
    window.location.href=url
  }


  redirectButton(el:Ielement){
    if(el.typeLink === 'link'){
      this.saveEvent('redirect-button', el.redirect)
      window.location.href = el.redirect
    }else if(el.typeLink === 'sendEvent'){
      this.saveEvent('click-button', {nameButton: el.text })    
      this.general.c('Seccess MSG', el.successMessage)
      this.modal = true
      this.message = el.successMessage
    }
  }

}
