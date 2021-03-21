import { Component, OnInit } from '@angular/core';
import { CUser } from 'src/app/models/user';
import { SubSink } from 'subsink';
import { IResponseApi, IResponseFront } from 'src/app/models/responses';
import { GeneralService } from '@services/general.service';
import { UserService } from './services/user.service';
import { ConfirmationService, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public subs = new SubSink()
  users: CUser[]
  response: IResponseFront = new IResponseFront()
  userForm: CUser = new CUser
  displayModal: boolean = false
  user: CUser
  currentUser: CUser

  constructor(
    private general: GeneralService,
    private userService: UserService, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.validateSession()
    this.getUsers()
  }

  ngOnDestroy(){
    this.subs.unsubscribe()
  }

  validateSession() {
    this.user = this.authService.isLoginUser()
  }

  getUsers(){
    this.subs.add(
      this.userService.getUsers().subscribe((response: IResponseApi)=>{
        this.general.c('GetUsers', response)
        this.users = [...response.data]
      })
    )
  }

  validateForm(){

    let invalid = false

    if (!this.userForm.name) {
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete el nombre' });
    }
    if (!this.userForm.email || !this.general.validateEmail(this.userForm.email)){
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifique el correo' });
    }
    if (!this.userForm.password || this.userForm.password.length < 8) {
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Revise la contraseña, debe tener como mínimo 8 dígitos' });
    }
    if (!this.userForm.role) {
      invalid = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Seleccione un rol' });
    }

    return invalid

  }

  confirm(event:Event, userid:string) {
    this.confirmationService.confirm({  
      target: event.target,   
      message: "¿Segúro que desea eliminar?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        this.deleteUser(userid);
      },
      reject: () => {
        // Nothing
      }
    });
  }

  addEdit(element = null){
    if(element){
      this.userForm = element
    }else{
      this.userForm = new CUser
    }
    this.displayModal = true
  }

  deleteUser(userid:string){

    this.general.c('deleteUser', userid)
    if(userid === this.user._id){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No puede eliminar su propio usuario' });
    }else{
      this.subs.add(
        this.userService.deleteUser(userid).subscribe((response: IResponseApi)=>{
          if (response.status === 200) {
            this.getUsers()
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario eliminado' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
          }
        })
      )
    }

  }

  save(){

    if (!this.validateForm()){
      this.subs.add(
        this.userService.saveUser(this.userForm).subscribe((response: IResponseApi)=>{        
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: response.message });    
          this.getUsers()
        }, error =>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
      )
    }
    
  }

}
