import { Injectable } from '@angular/core';
import { IDataApi } from 'src/app/models/dataapi';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../auth/services/auth.service';
import { IURL } from '../models/url';
import { Observable } from 'rxjs';
import { GeneralService } from '@services/general.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private general: GeneralService
  ) { }

  saveMultipleURL(url: IURL){
    const data: IDataApi = {
      service: 'save-multiple-url',
      type: 'post',
      data: url
    }
    return this.api.api(data)
  }

  saveURL(url: IURL) {
    const data: IDataApi = {
      service: 'save-url',
      type: 'post',
      data: url
    }
    return this.api.api(data)
  }

  getUrlsByList(listID: string) {
    const data: IDataApi = {
      service: `get-urls-by-list/${listID}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

  getURLsBYUserID(userid: string){
    const data: IDataApi = {
      service: `get-urls-by-userid/${userid}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  } 

  delURL(urlID: string){
    const data: IDataApi = {
      service: `delete-url/${urlID}`,
      type: 'delete',
      data: null
    }
    return this.api.api(data)
  }

  getLists() {
    const data: IDataApi = {
      service: `get-lists-by-userid/${this.authService.getUserID()}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

  getURLsBYListID(listID:string){
    const data: IDataApi = {
      service: `get-urls-by-list/${listID}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

  

  issetCompanyNameAndText(params:any){
    const data: IDataApi = {
      service: `isset-companyname-and-text`,
      type: 'post',
      data: params
    }
    return this.api.api(data)
  }

  filtersFields(lists:Array<any>, urls: Array<any>, currentCompanies: Array<any>, startDate: any, endDate:any){ 
    
    const response:any = {
      lists: [], 
      urls: []
    }
    
    if (lists && lists.length > 0) {      
      lists = lists.filter(list => new Date(list.date) >= new Date(startDate))
      lists = lists.filter(list => new Date(list.date) <= new Date(endDate))
      let newLists = []
      currentCompanies.map((company) => {       
        lists.map((list:any)=>{
          if (list.companyID == company._id){
            newLists = [...newLists, list]
          }
        })                
      })

      response.lists = newLists
    }

    if (urls && urls.length > 0) {      
      urls = urls.filter(url => new Date(url.date) >= new Date(startDate))
      urls = urls.filter(url => new Date(url.date) <= new Date(endDate))
      let newUrls = []
      currentCompanies.map((company) => {        
        urls.map((url: any) => {
          if (url.companyID == company._id) {
            newUrls = [...newUrls, url]
          }
        })
      })

      response.urls = newUrls
    }
    
    return response;

  }


  downloadList(urls:Array<IURL>) {
    let data: any = []
    urls.map((url: IURL) => {
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
  


}
