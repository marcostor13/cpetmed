import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '@services/general.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SubSink } from 'subsink';
import { IResponseApi } from './../../../models/responses';
import { cloneDeep } from 'lodash-es';
import { IURL } from '../models/url';
import { UrlService } from './../services/url.service';
import { AuthService } from '../../auth/services/auth.service';
import * as moment from 'moment';
import { CompanyService } from '../../admin/companies/services/company.service';
import { IList } from './../models/list';
import { Company } from '../../admin/companies/models/company';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private subs = new SubSink()
  urls: IURL[]
  tmpUrls: IURL[]
  modal: boolean = false
  currentUrl: IURL
  currentParameters: any
  lists: IList[]
  tmpLists: IList[]
  startDate: Date = new Date(moment().add(-7, 'days').calendar())
  endDate:Date = new Date()
  companies: Company[]
  currentCompanies: Company[] = []

  constructor(
    private general: GeneralService,
    private messageService: MessageService,
    private authService:AuthService,
    private urlService: UrlService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.getUrlsData()   
    this.getCompanies() 
    this.getLists()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getUrlsData(){
    this.subs.add(
      this.urlService.getURLsBYUserID(this.authService.getUserID()).subscribe((res: IResponseApi)=>{
        this.urls = cloneDeep(res.data)
        this.tmpUrls = cloneDeep(res.data)     
        this.general.c('getUrlsData', this.tmpUrls)   
        this.filters()
           
      })
    )
  }

  getCompanies(){
    this.subs.add(
      this.companyService.getCompanies().subscribe((response: IResponseApi)=>{
        this.companies = cloneDeep(response.data)
        this.companies.map((company)=>{
          this.currentCompanies = [...this.currentCompanies, company]
          
        })          
      })
    )
  }

  getLists() {
    this.subs.add(
      this.urlService.getLists().subscribe((res: IResponseApi) => {
        this.lists = cloneDeep(res.data)
        this.tmpLists = cloneDeep(res.data)        
        this.filters()
      })
    )
  }

  filters(){   
    const filt = this.urlService.filtersFields(this.tmpLists, this.tmpUrls, this.currentCompanies, this.startDate, this.endDate)
    this.urls = [...filt.urls]
    this.lists = [...filt.lists]
    
  }

  

  deleteConfirmation(id: string, index:number) {
    this.confirmationService.confirm({
      message: 'Seguro que desea eliminar?',
      accept: () => {
        this.deleteURL(id, index)
      },
      acceptButtonStyleClass: "bg-color5",
      acceptLabel: "Si"
    });
  }

  deleteURL(id:string, index:number){
    this.subs.add(
      this.urlService.delURL(id).subscribe((res: IResponseApi)=>{
        this.urls = cloneDeep([...this.urls.filter((url: IURL) => url._id !== id)])       
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: res.message })
      }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
      })
    )
  }


  editURL(url:IURL){
    // this.landingService.editLanding(landing)
    // this.router.navigate(['/admin/landings/add'])   
  }

  viewURL(url:any){
    const { __v, parameters,...newURL} = url
    this.currentUrl = cloneDeep(newURL)
    this.currentParameters = url.parameters
    this.modal = true
  }

  redirectCreate(){
    this.router.navigate(['/urls/add'])
  }

  downloadList(list:any){
    this.subs.add(
      this.urlService.getURLsBYListID(list._id).subscribe((response: IResponseApi)=>{
        this.urlService.downloadList(response.data)
      })
    )
  }

  back(){

  }

}
