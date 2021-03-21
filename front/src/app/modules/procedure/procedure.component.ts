import { Component, OnInit } from '@angular/core';
import { CProcedure } from './models/procedure';
import { SubSink } from 'subsink';
import { IResponseApi, IResponseFront } from 'src/app/models/responses';
import { ProcedureService } from './services/procedure.service';
import { ConfirmationService, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { CUser } from 'src/app/models/user';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent implements OnInit {

  public subs = new SubSink()
  items: CProcedure[]
  response: IResponseFront = new IResponseFront()
  form: CProcedure = new CProcedure
  displayModal: boolean = false
  user: CUser

  constructor(
    private general: GeneralService,
    private userService: UserService,
    private procedureService: ProcedureService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.validateSession()
    this.getData()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  validateSession() {
    this.user = this.authService.isLoginUser()
  }

  getData() {
    this.subs.add(
      this.procedureService.get().subscribe((response: IResponseApi) => {
        this.general.c('Get', response)
        this.items = [...response.data]
      })
    )
  }

  validateForm() {

    let invalid = false
    if (!this.form.name) {
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete el nombre' });
    }    
    return invalid

  }

  confirm(event: Event, userid: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: "¿Segúro que desea eliminar?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        this.delete(userid);
      },
      reject: () => {
        // Nothing
      }
    });
  }

  addEdit(element = null) {
    if (element) {
      this.form = element
    } else {
      this.form = new CProcedure
    }
    this.displayModal = true
  }

  delete(id: string) {

    this.general.c('Delete', id)
    if (id === this.user._id) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No puede eliminar su propio usuario' });
    } else {
      this.subs.add(
        this.procedureService.delete(id).subscribe((response: IResponseApi) => {
          if (response.status === 200) {
            this.getData()
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario eliminado' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
          }
        })
      )
    }

  }

  save() {

    if (!this.validateForm()) {
      this.subs.add(
        this.procedureService.save(this.form).subscribe((response: IResponseApi) => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message });
          this.getData()
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
      )
    }

  }

}
