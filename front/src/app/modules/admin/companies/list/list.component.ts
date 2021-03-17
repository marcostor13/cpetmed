import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '@services/general.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from '../models/company';

import { SubSink } from 'subsink';
import { IResponseApi } from './../../../../models/responses';
import { cloneDeep } from 'lodash-es';
import { CompanyService } from './../services/company.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private subs = new SubSink()
  companies: Company[]

  constructor(
    private general: GeneralService,
    private companyService: CompanyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCompaniesData()
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getCompaniesData() {
    this.subs.add(
      this.companyService.getCompanies().subscribe((res: IResponseApi) => {
        this.general.c('getCompaniesData', res.data)
        if (res.data) {
          this.companies = cloneDeep(res.data)
        }
      })
    )
  }

  deleteConfirmation(id: string, index: number) {
    this.confirmationService.confirm({
      message: 'Seguro que desea eliminar?',
      accept: () => {
        this.deleteCompany(id, index)
      },
      acceptButtonStyleClass: "bg-color5",
      acceptLabel: "Si"
    });
  }

  deleteCompany(id: string, index: number) {
    this.subs.add(
      this.companyService.deleteCompany(id).subscribe((res: IResponseApi) => {
        this.companies = cloneDeep([...this.companies.filter((Company: Company) => Company._id !== id)])
        this.general.c('New companies', this.companies)
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: res.message })
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
      })
    )
  }


  editCompany(Company: Company) {
    this.companyService.editCompany(Company)
    this.router.navigate(['/admin/companies/add'])
  }

  redirectCreate() {
    this.router.navigate(['/admin/companies/add'])
  }

  back() {

  }

}
