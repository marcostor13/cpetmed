import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { IDataApi } from 'src/app/models/dataapi';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
  ) { }

  saveUser(element:any) {
    const data: IDataApi = {
      service: element._id ? `update-user/${element._id}`: `save-user`,
      type: element._id ? 'patch':'post',
      data: element
    }
    return this.api.api(data)
  }

  getUsers() {
    const data: IDataApi = {
      service: `get-user`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

  deleteUser(userid:string) {
    const data: IDataApi = {
      service: `delete-user/${userid}`,
      type: 'delete',
      data: null
    }
    return this.api.api(data)
  }


}
