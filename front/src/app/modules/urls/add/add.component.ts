import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '@services/general.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IResponseApi } from 'src/app/models/responses';
import { SubSink } from 'subsink';
import { IURL } from './../models/url'
import { LandingsService } from './../../admin/landings/services/landings.service';
import { Landing } from '../../admin/landings/models/add-landing';
import { cloneDeep } from 'lodash-es';
import { UrlService } from './../services/url.service';
import { CompanyService } from '../../admin/companies/services/company.service';
import { Company } from '../../admin/companies/models/company';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  private subs = new SubSink()  
  response: IResponseApi
  modal: boolean = false
  invalid: boolean = false
  url: IURL = new IURL
  typeURL: any = 'URL'
  landings: Landing[]
  parameters: Array<object> = []
  parametersMultiple: Array<object> = []
  parameter = {
    name: '',
    value: ''
  }
  currenrURLData: IURL = new IURL
  validText: boolean = true
  companies: Company[]
  uploadPercentExcel: number
  dataExcelParameters: Array<any>  
  currentURLS: IURL[]

  constructor(
    private general: GeneralService,   
    private landingsService: LandingsService,
    private urlService: UrlService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.getLandings()
    this.getCompanies()
    this.general.isLoad('0')
  }

  addParameter(){
    if(this.parameter){      
      this.parameters = [...this.parameters, this.parameter]
      this.parameter = {
        name: '',
        value: ''
      }
    }
  }

  getLandings() {
    this.subs.add(
      this.landingsService.getLandings().subscribe((response: IResponseApi) => {
        this.landings = cloneDeep(response.data)        
      })
    )
  }

  openModal(){
    this.modal=true
  }

  getCompanies() {
    this.subs.add(
      this.companyService.getCompanies().subscribe((response: IResponseApi) => {
        this.companies = cloneDeep(response.data)        
      })
    )
  }

  validate(){
    this.messageService.clear();
    let res = true
    this.invalid = false
    const text = []
    if (
      (this.typeURL === 'URL' && !this.url.url) || 
      (this.typeURL === 'Landing' && !this.url.landingID) || 
      (this.typeURL === 'Whatsapp' && (!this.url.whatsappNumber || !this.url.whatsappText)) 
      ) {
      res = false
      this.invalid = true
      this.messageService.add({ severity: 'error', summary: 'Validación', detail: 'Debe completar los datos requeridos' });
    } 
    if(this.url.companyName && (this.url.text === '' || !this.validText)){
      res = false
      this.invalid = true
      this.messageService.add({ severity: 'error', summary: 'Validación', detail: 'Debe completar el texto de la url' });
    }
    return {
      isValid: res,
      responses: text
    }
  }

  validateMultiple() {
    this.messageService.clear();
    let res = true
    this.invalid = false
    const text = []
    if (
      (this.typeURL === 'URL' && !this.url.url) ||
      (this.typeURL === 'Landing' && !this.url.landingID) ||
      (this.typeURL === 'Whatsapp' && (!this.url.whatsappNumber || !this.url.whatsappText))
    ) {
      res = false
      this.invalid = true
      this.messageService.add({ severity: 'error', summary: 'Validación', detail: 'Debe completar los datos requeridos' });
    }
    if (!this.url.listName) {
      res = false
      this.invalid = true
      this.messageService.add({ severity: 'error', summary: 'Validación', detail: 'Debe completar el texto de la url' });
    }
    return {
      isValid: res,
      responses: text
    }
  }

  generateURL(){    
    this.url.typeURL = this.typeURL
    this.url.parameters = this.parameters    
    if(this.validate().isValid){
      this.general.isLoad('1')
      this.general.c('generateURL', this.url)
      this.subs.add(
        this.urlService.saveURL(this.url).subscribe((response:IResponseApi)=>{
          this.general.isLoad('0')
          this.currenrURLData = cloneDeep(response.data)
          this.url = new IURL
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message })
        })
      )
    }
  }

  issetCompanyNameAndText(param){  
    if (param !== ''){
      this.subs.add(
        this.urlService.issetCompanyNameAndText({companyName: this.url.companyName, text: this.url.text}).subscribe((response: IResponseApi) => {  
          if(response.data && response.data.length > 0){
            this.validText = false   
          }else{
            this.validText = true   
          }
        })
      )    
    }
  }

  //MULTIPLE

  onUploadExcel($event){       
    this.dataExcelParameters = [] 
    const file = $event.currentFiles[0]     
    const reader = new FileReader();
    reader.onload = (e) => {
      let data = (<any>e.target).result;
      this.url.dataExcel = [...this.general.importFromFile(data)]    
      Object.keys(this.url.dataExcel[0]).map((key:any)=>{
        this.dataExcelParameters.push({
          name: key
        })        
      })          
    }
    reader.onerror = (ex) => {
      this.general.c('ERROR Import Excel', ex)
    } 
    reader.readAsBinaryString(file);
  } 

  generateMultipleURL(){
    const params = []
    this.parametersMultiple.map((item:any)=>{
      params.push(item.name)
    })       
    this.url.typeURL = this.typeURL
    this.url.parameters = this.parametersMultiple
    if (this.validateMultiple().isValid) {
      this.general.isLoad('1')   
      this.general.c('generateMultiple URL', this.url)   
      this.subs.add(
        this.urlService.saveMultipleURL(this.url).subscribe((response: IResponseApi) => {
          this.general.isLoad('0')
          this.subs.add(
            this.urlService.getUrlsByList(response.data).subscribe((response2: IResponseApi) => {
              this.currentURLS = cloneDeep(response2.data)              
            })
          )
          this.url = new IURL
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message })
        })
      )
    }
  }

  downloadList(){
    let data:any = []
    this.currentURLS.map((url:IURL)=>{
      let params = {}
      for (const key in url.parameters) {        
        let prop: any = {}
        prop[key] = url.parameters[key]
        params = { ...params, ...prop }
      }
      params = { ...params, "Url Corta": url.shortUrl }
      data = [...data, params]
    })

    this.general.exportToFile(data, 'export_' + new Date().toISOString().slice(0, 10))
  }

  back(){
    window.location.href ="/urls/list"
  }

}
