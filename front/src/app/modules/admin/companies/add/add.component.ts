import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Company } from '../models/company';
import { IResponseApi } from './../../../../models/responses';
import { cloneDeep } from 'lodash-es';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IDataApi } from './../../../../models/dataapi';
import { Router } from '@angular/router';
import { CUser } from 'src/app/models/user';
import { CompanyService } from '../services/company.service';
import { GeneralService } from 'src/app/services/general.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  private subs = new SubSink()
  company: Company = new Company
  response: IResponseApi
  modal: boolean = false
  invalid: boolean = false 
  userData: CUser

  constructor(
    private general: GeneralService,
    private companyService: CompanyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCompanyData()
    this.getUserData()
    this.general.isLoad('0')
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getUserData() {
    this.userData = JSON.parse(localStorage.getItem('bintuser'))
  }

  updateCompanyData() {
    this.companyService.setCompanyData(this.company)
  }

  getCompanyData() {
    this.subs.add(
      this.companyService.getCompanyData().subscribe((company: Company) => {
        if (company) {
          this.company = cloneDeep(company)
        }
      })
    )
  }
 
  validateCompany() {
    this.messageService.clear();
    let res = true
    this.invalid = false
    const text = []
    if (!this.company.legalname || !this.company.comercialname || !this.company.address || !this.company.phone) {
      res = false
      this.invalid = true
      this.messageService.add({ severity: 'error', summary: 'Validación', detail: 'Debe completar todos los datos' });
    }
    
    return {
      isValid: res,
      responses: text
    }
  }

  saveCompany() {

    this.general.c('saveCompany', this.company)
    this.general.isLoad('1')
    this.company.userid = this.userData._id
    const data = new IDataApi
    if (this.validateCompany().isValid) {
      this.subs.add(
        this.companyService.saveCompany(this.company).subscribe((res: IResponseApi) => {
          if (!this.company._id) {
            this.company = new Company
            this.updateCompanyData()
          }
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: res.message })
          this.general.isLoad('0')
        }, error => {
            this.general.isLoad('0')
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
        })
      )
    }
  }  

  back() {
    if (this.company) {
      this.confirmationService.confirm({
        message: 'Seguro que desea salir?',
        accept: () => {
          this.company = null
          this.updateCompanyData()
          this.router.navigate(['/admin/companies/list'])
        },
        acceptButtonStyleClass: "bg-color5 btn3",
        acceptLabel: "Si, salir"
      });
    } else {
      this.router.navigate(['/admin/companies/list'])
    }
  }


}
