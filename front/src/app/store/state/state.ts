
import { Company } from 'src/app/modules/admin/companies/models/company';
import { Landing } from './../../modules/admin/landings/models/add-landing';

export interface IStoreState {
    data: any
    isLoading: string
    landing: Landing
    landings: Landing[]
    company: Company
    companies: Company[]
}

export const initialState: IStoreState = {
    data: {}, 
    isLoading: '0',
    landing: null,
    landings: null,
    company: null,
    companies: null,
};
