import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  constructor(
    private api: ApiService,
    private router: Router
    ) { }

  login(data){
    return this.api.api({
      service:'signin',
      data: data,
      type: 'post'
    })   
  }

  register(data) {
    return this.api.api({
      service: 'signup',
      data: data,
      type: 'post'
    })
  }

  isLogin(){
    const user = localStorage.getItem('bintuser')
    if(user && user !== ''){
      return true
    }else{
      return false
    }
  }

  isLoginUser() {
    const user = localStorage.getItem('bintuser')
    if (user && user !== '') {
      return JSON.parse(user)
    } else {
      return null
    }
  }

  getRole() {
    return localStorage.getItem('bintuser') ? JSON.parse(localStorage.getItem('bintuser'))?.role : null    
  }

  getUserID() {
    return localStorage.getItem('bintuser') ? JSON.parse(localStorage.getItem('bintuser'))?._id : null
  }

  sendEmailCode(email: string) {
    return this.api.api({
      service: 'send-email-code',
      data: { email },
      type: 'post'
    })
  }

  codeComprobation(email: string, code: string) {
    return this.api.api({
      service: 'code-comprobation',
      data: { email, code },
      type: 'post'
    })
  }

  issetEmail(email: string) {
    return this.api.api({
      service: 'isset-email',
      data: { email },
      type: 'post'
    })
  }

  logout(){
    localStorage.removeItem('bintuser');
    this.router.navigate(['/auth/login'])
  }

}
