import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@services/general.service';
import { IResponseApi } from 'src/app/models/responses';
import { SubSink } from 'subsink';
import { IEvent } from '../landings/models/event';
import { LandingService } from '../landings/services/landing.service';
import { IURL } from '../urls/models/url';
import { PasspageService } from './services/passpage.service';

@Component({
  selector: 'app-passpage',
  templateUrl: './passpage.component.html',
  styleUrls: ['./passpage.component.scss']
})
export class PasspageComponent implements OnInit {

  private subs = new SubSink()
  companyID: string
  code: string 
  urlData: IURL
  res: string

  constructor(
    private route: ActivatedRoute,
    private general: GeneralService,
    private passpageService: PasspageService, 
    private landingService: LandingService,
    private router:Router,
  ) {
    this.companyID = this.route.snapshot.paramMap.get('companyID')
    this.code = this.route.snapshot.paramMap.get('code') 
    this.getUrlData()
   }

  ngOnInit(): void {
  }

  getUrlData(){
    this.subs.add(
      this.passpageService.getUrlData(this.code,this.companyID).subscribe((response: IResponseApi)=>{
        this.general.c('GetURLData', response.data)

        if(response.data || response.data.length > 0){
          const event:IEvent = new IEvent
          this.urlData = response.data[0]
          event.landingid = this.urlData?.landingID || null
          event.data.dataLanding = this.urlData
          event.companyID = this.urlData.companyID
          event.urlID = this.urlData._id
          event.url = this.urlData.longURL
          event.shortURL = this.urlData.shortUrl
          event.type = 'redirect'
          this.landingService.saveEvent(event).subscribe()

          //Cambiar los datos entre paréstesis de la url whastapp
          if (this.urlData.typeURL === 'URL' || this.urlData.typeURL === 'Whatsapp' ){
            window.location.href = `${this.urlData.longURL}`
          }else{
            window.location.href = `${this.urlData.longURL}/${this.urlData._id}`
          }

        }else{
          this.res = 'No existe la página'
        }
      })
    )
  }


}
