import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = window.location.hostname.indexOf('cpetmed') > -1 ? 'https://api.cpetmed.com/' : 'http://localhost:3003/'

  constructor(private http: HttpClient) {}

  api(data:any) {
   
    if(data.type == 'get'){
      return this.http.get(`${this.baseUrl + data.service}`)      
    }else if(data.type == 'post'){
      return this.http.post(`${this.baseUrl + data.service}`, data.data)
    } else if (data.type == 'patch') {
      return this.http.patch(`${this.baseUrl + data.service}`, data.data)
    } else if (data.type == 'delete') {
      return this.http.delete(`${this.baseUrl + data.service}`)
    }
  }
 

}
