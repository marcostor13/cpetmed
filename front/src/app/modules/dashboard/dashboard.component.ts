import { Component, OnInit } from '@angular/core';
import { GeneralService } from '@services/general.service';
import { IResponseApi } from 'src/app/models/responses';
import { SubSink } from 'subsink';
import { CompanyService } from '../admin/companies/services/company.service';
import { cloneDeep } from 'lodash-es';
import { DashboardService } from './services/dashboard.service';
import { LandingsService } from './../admin/landings/services/landings.service';
import { UrlService } from './../urls/services/url.service';
import { Landing } from '../admin/landings/models/add-landing';
import { IURL } from '../urls/models/url';
import * as moment from 'moment'
import { Company } from '../admin/companies/models/company';
import { IList } from '../urls/models/list';
import { DashboardData } from './models/data';
import { IEvent } from '../landings/models/event';
import { Charts } from './models/charts';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private subs = new SubSink()
  startDate: Date = new Date(moment().add(-7, 'days').calendar())
  endDate: Date = new Date()  
  currentCompanies: Company[] = []  
  currentLandings: Landing[] = []
  companies: Company[]  
  landings: Landing[]
  data: DashboardData = new DashboardData
  dataTmp: DashboardData = new DashboardData
  lists: IList[]  
  currentLists: IList[] =[]  
  typesEvents: string[]  
  currentTypesEvents: string[] = []
  typesURLs: string[]  
  currentTypeURLs: string[] = []
  dataChart1: Charts
  dataChart2: Charts
  dataChart3: Charts

  
  constructor(
    private general: GeneralService,
    private companyService: CompanyService,
    private dashboardService: DashboardService,
    private landingsService: LandingsService,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.getCompanies()
    this.getLandings()
    this.getLists()    
    this.getData()
  }

  getData(){   
    this.subs.add(
      this.dashboardService.getData().subscribe((response: IResponseApi)=>{
        this.data = cloneDeep(response.data)
        this.dataTmp = cloneDeep(response.data)
        this.general.c('getData res', response.data)
        this.general.c('getData', this.data)
        this.getTypesEvents()
        this.getTypesURLs()
        this.getCharts()
      })
    )
  }

  getCompanies() {
    this.subs.add(
      this.companyService.getCompanies().subscribe((response: IResponseApi) => {
        this.companies = cloneDeep(response.data)
        this.companies.map((company) => {
          this.currentCompanies = [...this.currentCompanies, company]
        })        
      })
    )
  }

  getLandings() {
    this.subs.add(
      this.landingsService.getLandings().subscribe((response: IResponseApi) => {
        this.landings = cloneDeep(response.data)
        this.landings.map((landing) => {
          this.currentLandings = [...this.currentLandings, landing]
        })
        const withoutLandingOption = new Landing
        withoutLandingOption._id = null
        withoutLandingOption.name = 'Sin Landing'
        this.landings = [...this.landings, withoutLandingOption]
        this.currentLandings = [...this.currentLandings, withoutLandingOption]
        this.general.c('getLandings', this.currentLandings)
      })
    )
  }

  getLists() {
    this.subs.add(
      this.urlService.getLists().subscribe((response: IResponseApi) => {
        this.lists = cloneDeep(response.data)
        this.lists.map((list) => {
          this.currentLists = [...this.currentLists, list]
        })
        const withoutListsOption:IList = new IList
        withoutListsOption.name = 'Sin Lista'
        this.lists = [...this.lists, withoutListsOption]
        this.currentLists = [...this.currentLists, withoutListsOption]
        this.general.c('getLists', this.currentLists)
      })
    )
  }

  getTypesEvents(){
    this.typesEvents = this.dashboardService.getTypesEvents(this.dataTmp.events)
    this.general.c('getTypesEvents', this.dataTmp.events)
    this.typesEvents.map((typeEvent) => {
      this.currentTypesEvents = [...this.currentTypesEvents, typeEvent]
    })
    this.getCards()
  }

  getTypesURLs() {
    this.typesURLs = this.dashboardService.getTypesURLs(this.dataTmp.urls)
    this.typesURLs.map((typeURL) => {
      this.general.c('typsURls', typeURL)
      this.currentTypeURLs = [...this.currentTypeURLs, typeURL]
    })
    this.getCards()
  }
  

  getCards(){

    this.general.c('GetCards', 'start')    
    //TOTAL URLS
    this.data.urls = cloneDeep(this.dataTmp.urls.filter((url: IURL) =>
      new Date(url.date).getTime() >= this.startDate.getTime() &&
      new Date(url.date).getTime() <= this.endDate.getTime() &&
      this.currentCompanies.find(company => company._id === url.companyID) &&
      this.currentLandings.find(landing => landing._id === url.landingID) &&
      this.currentLists.find((list) => list._id === url.listID) &&
      this.currentTypeURLs.find((typeURL) => typeURL === url.typeURL)
    ))

    //TOTAL LISTS
    this.data.lists = cloneDeep(this.dataTmp.lists.filter((list: IList) =>
      new Date(list.date).getTime() >= this.startDate.getTime() &&
      new Date(list.date).getTime() <= this.endDate.getTime() &&     
      this.currentTypeURLs.find((typeURL) => typeURL === this.dashboardService.getFiledByField(this.dataTmp.urls, list._id, 'listID', 'typeURL')) &&
      this.currentLandings.find((landing) => landing._id === this.dashboardService.getFiledByField(this.dataTmp.urls, list._id, 'listID', 'landingID')) && 
      this.currentCompanies.find(company => company._id === list.companyID) &&
      this.currentLists.find((l) => l._id === list._id)
      
    ))

    //TOTAL LANDINGS
    this.data.landings = cloneDeep(this.dataTmp.landings.filter((landing: Landing) =>
      new Date(landing.date).getTime() >= this.startDate.getTime() &&
      new Date(landing.date).getTime() <= this.endDate.getTime() &&
      this.currentCompanies.find(company => company._id === landing.companyid) &&
      this.currentLists.find((list) => list._id === this.dashboardService.getFiledByField(this.dataTmp.urls, landing._id, 'landingID', 'listID')) &&
      this.currentLandings.find(lan => lan._id === landing._id)      
    ))

    //TOTAL EVENTS
    this.data.events = cloneDeep(this.dataTmp.events.filter((event: IEvent ) =>
      new Date(event.date).getTime() >= this.startDate.getTime() &&
      new Date(event.date).getTime() <= this.endDate.getTime() &&
      this.currentCompanies.find(company => company._id === event.companyID) &&
      this.currentLandings.find(landing => landing._id === event.landingid) &&
      this.currentTypesEvents.find((e) => e === event.type) &&
      this.currentTypeURLs.find((typeURL) => typeURL === this.dashboardService.getFiledByField(this.dataTmp.urls, event.urlID, '_id',  'typeURL')) &&
      this.currentLists.find((list) => list._id === event.listID)
    ))  

  }

  getCharts(){
    this.getDataChart1()
    this.getDataChart2()
    this.getDataChart3()
  }

  //URLS VS TYPE URL
  getDataChart1() {
    let data:any = {}
    this.data.urls.map((url: IURL) => {
      if (!data[url.typeURL]) {
        data[url.typeURL] = 1
      }else{
        data[url.typeURL]++
      }
    })
    this.dataChart1 = {...this.dashboardService.formatCharts(data)}   
    this.general.c('getDataChart1', this.dataChart1)    
  }



  getDataChart2() {
    let data: any = {}
    this.data.urls.map((url: IURL) => {
      if (!data[url.listID]) {
        data[url.listID] = 1
      } else {
        data[url.listID]++
      }
    })
    this.dataChart2 = { ...this.dashboardService.formatCharts(data) }
    this.dataChart2.datasets[0].label = 'URLS'
    this.dataChart2.labels.map((label:string, index:number)=>{
      this.dataChart2.labels[index] = this.dashboardService.getFiledByField(this.dataTmp.urls, label, 'listID', 'listName')      
    })   

    this.general.c('getDataChart2', this.dataChart2)
  }

  getDataChart3() {
    let data: any = {}
    this.data.landings.map((landing: Landing) => {
      if (!data[landing.companyid]) {
        data[landing.companyid] = 1
      } else {
        data[landing.companyid]++
      }
    })
    this.dataChart3 = { ...this.dashboardService.formatCharts(data) }
    this.dataChart3.datasets[0].label = 'Landings'
    this.dataChart3.labels.map((label: string, index: number) => {
      this.dataChart3.labels[index] = this.dashboardService.getFiledByField(this.companies, label, '_id', 'comercialname')
    })

    this.general.c('getDataChart3', this.dataChart3)
  }

  getFieldByID(data:any, id:string, field:string){
    return this.dashboardService.getFieldByID(data, id, field)
  }

  clear(table: Table) {
    table.clear();
  }

  formatDataExcelLandings(data:any){   
    const dataLandingTmp = cloneDeep(data)    
    let dataLanding = []
    dataLandingTmp.map((d) => {
      d.elements = JSON.stringify(d.elements)
      d.validationRut = (d.validationRut) ? 'Si' : 'No'
      dataLanding = [...dataLanding, d] 
    })  
    const fields = {
      _id: 'ID'	,
      name: 'Nombre',
      date: 'Fecha creación',
      companyid: 'ID Empresa',
      backgroundURL: 'URL del Fondo',
      backgroundName: 'Fondo',
      backgroundColor: 'Color de fondo',
      opacity: 'Opacidad',
      logoURL: 'URL del logo',
      logoName: 'Logo',
      validationRut: 'Validación de Rut',
      validationRutDigits: 'Cantidad de digitos del rut',
      elements: 'Elementos'
    }
    return this.dashboardService.changeNamesHeaderExcel(dataLanding, fields)
  } 
  
  formatDataExcelURLs(data: any) {
    const datTmp = cloneDeep(data)
    let dat = []
    let fields = {
      _id: 'ID',
      code: 'Código',
      date: 'Fecha creación',
      companyID: 'ID Empresa',
      companyName: 'Empresa',
      landingID: 'ID Landing',
      landing: 'Landing',
      listID: 'ID Lista',
      listName: 'Lista',
      longURL: 'URL larga',
      shortUrl: 'URL Corta',
      typeURL: 'Tipo de URL',
    }  
    
    let headerParameters = {}


    datTmp.map((d)=>{
      // d.parameters = JSON.stringify(d.parameters)

      let newElement:any = {}
      if (d.parameters){
        for (const key in d.parameters){   
          if (!headerParameters[key]){
            headerParameters[key] = key
          }
          d[key] = d.parameters[key]
        }
      }
      d['landing'] = this.getFieldByID(this.landings, d.landingID, 'name')
      dat = [...dat, d]
    })
     
    return this.dashboardService.changeNamesHeaderExcel(dat, { ...fields, ...headerParameters})
  } 

  formatDataExcelEvents(data: any) {
    const datTmp = cloneDeep(data)
    let dat = []
    datTmp.map((d) => {
      d['device'] = d.data.navigatorData.platform
      d['companyName'] = this.getFieldByID(this.companies, d.companyID, 'comercialname')
      d['landing'] = this.getFieldByID(this.landings, d.landingid, 'name')
      d['shortUrl'] = this.getFieldByID(this.data.urls, d.urlID, 'shortUrl')
      dat = [...dat, d]
      d.data = JSON.stringify(d.data)
    })
    const fields = {
      _id: 'ID',
      date: 'Fecha creación',
      companyID: 'ID Empresa',
      companyName: 'Empresa',
      landingid: 'ID Landing',
      landing: 'Landing',
      listID: 'ID Lista',
      listName: 'Lista',
      url: 'URL larga',
      shortUrl: 'URL Corta',
      type: 'Tipo',
      data: 'Datos adicionales',
      device: 'Dispositivo'
    }
    return this.dashboardService.changeNamesHeaderExcel(dat, fields)   
  } 

  exportExcel(data: any, name:string){
    this.general.c('Data', data)
    this.dashboardService.exportExcel([{name: name, data: data}], name)
  }


  exportAllExcel(){
    const dataSheets = [
      { name: 'URLS', data: this.formatDataExcelURLs(this.data.urls) },
      { name: 'LANDINGS', data: this.formatDataExcelLandings(this.data.landings) },
      { name: 'EVENTOS', data: this.formatDataExcelEvents(this.data.events) },
    ]
    this.dashboardService.exportExcel(dataSheets, 'ResumenTotal')
  }

  

}


