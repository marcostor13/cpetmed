import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import { Company } from '../models/company';
import { stateActions } from 'src/app/store/actions/setdata.actions';
import { Observable } from 'rxjs';
import { IDataApi } from 'src/app/models/dataapi';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private store: Store<any>,
    private api: ApiService,
    private general: GeneralService,
  ) { }

  getCompanyData(): Observable<Company> {
    return this.store.select((state) => state.Reducer.company);
  }

  setCompanyData(dataCompany: Company) {
    this.store.dispatch(stateActions.setCompanyData({ dataCompany }))
  }

  editCompany(company: Company) {
    this.store.dispatch(stateActions.editCompany({ company }))
  }

  saveCompany(company: Company) {
    const data: IDataApi = {
      service: company._id ? `update-company/${company._id}` : 'save-company',
      type: company._id ? 'patch' : 'post',
      data: company
    }
    return this.api.api(data)
  }

  getCompanies(){
    const data: IDataApi = {
      service: `get-companies/${this.general.getUserData()._id}`,
      type: 'get',
      data: null
    }
    return this.api.api(data)
  }

  getCompanyByID(id: string) {
    const data: IDataApi = {
      service: `get-company-by-id/${id}`,
      type: 'get',
      data: ''
    }
    return this.api.api(data)
  }

  updateCompany(id: string) {
    const data: IDataApi = {
      service: `update-company/${id}`,
      type: 'delete',
      data: ''
    }
    return this.api.api(data)
  }

  deleteCompany(id: string) {
    const data: IDataApi = {
      service: `delete-company/${id}`,
      type: 'delete',
      data: ''
    }
    return this.api.api(data)
  }

}
