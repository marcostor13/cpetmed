import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IDataApi } from 'src/app/models/dataapi';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private api: ApiService,
  ) { }

  saveDoctorInfo(element:any) {
    const data: IDataApi = {
      service: element._id ? `update-doctor/${element._id}`: `save-doctor`,
      type: element._id ? 'patch':'post',
      data: element
    }
    return this.api.api(data)
  }

  getDoctorInfo(element:any) {
    const data: IDataApi = {
      service: `get-doctor-by-email/${element}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

  getDoctorBySpecialty(element: any) {
    const data: IDataApi = {
      service: `get-doctor-by-specialtyid/${element}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }


  getDoctors() {
    const data: IDataApi = {
      service: `get-doctor`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

  

}
