import { Injectable } from '@angular/core';
import { IDataApi } from 'src/app/models/dataapi';
import { ApiService } from './../../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PasspageService {

  constructor(
    private api: ApiService
  ) { }

  getUrlData(code: string, companyID: string){
    let service = ''
    if(companyID){
      service = `get-urls-by-companyid-and-code/${companyID}/${code}` 
    }else{
      service = `get-urls-by-code/${code}`
    }

    const data: IDataApi = {
      service: service,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

}
