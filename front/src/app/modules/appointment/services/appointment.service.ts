import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IDataApi } from 'src/app/models/dataapi';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  model: string = 'appointment'

  constructor(
    private api: ApiService,
  ) { }

  save(element: any) {
    const data: IDataApi = {
      service: element._id ? `update-${this.model}/${element._id}` : `save-${this.model}`,
      type: element._id ? 'patch' : 'post',
      data: element
    }
    return this.api.api(data)
  }

  updateAppointment(element: any) {
    const data: IDataApi = {
      service: `update-${this.model}/${element._id}`,
      type: 'patch',
      data: element
    }
    return this.api.api(data)
  }

  updateAppointmentData(element: any) {
    const data: IDataApi = {
      service: `update-${this.model}-data`,
      type: 'post',
      data: element
    }
    return this.api.api(data)
  }

  get() {
    const data: IDataApi = {
      service: `get-${this.model}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

  delete(element: any) {
    const data: IDataApi = {
      service: `delete-${this.model}`,
      type: 'post',
      data: element
    }
    return this.api.api(data)
  }

  

}
