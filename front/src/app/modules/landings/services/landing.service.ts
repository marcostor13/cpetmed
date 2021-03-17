import { Injectable } from '@angular/core';
import { IDataApi } from 'src/app/models/dataapi';
import { ApiService } from 'src/app/services/api.service';
import { IEvent } from './../models/event';
import { cloneDeep } from 'lodash-es';
import { GeneralService } from '@services/general.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(
    private api: ApiService,
    private general: GeneralService,
    private authService: AuthService
  ) { }

  saveEvent(event: IEvent) {
    event.userID = this.authService.getUserID()
    const data: IDataApi = {
      service: 'save-event',
      type: 'post',
      data: event
    }
    return this.api.api(data)
  }

  getParameters(urlID:string){
    const data: IDataApi = {
      service: `get-urls-by-id/${urlID}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }



}
