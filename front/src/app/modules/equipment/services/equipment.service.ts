import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IDataApi } from 'src/app/models/dataapi';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  model: string = 'equipment'

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

  get() {
    const data: IDataApi = {
      service: `get-${this.model}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

  delete(userid: string) {
    const data: IDataApi = {
      service: `delete-${this.model}/${userid}`,
      type: 'delete',
      data: null
    }
    return this.api.api(data)
  }

  

}
