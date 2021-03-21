import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  faDoorOpen,
  faTachometerAlt,
  faUsers,
  faIdCardAlt,
  faUserMd,
  faBookMedical,
  faFilePrescription,
  faMicroscope,
  faLaptopMedical,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/modules/auth/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  path: String = window.location.pathname
  menu: any
  
  faDoorOpen = faDoorOpen
  faTachometerAlt = faTachometerAlt
  faUsers = faUsers
  faIdCardAlt = faIdCardAlt
  faUserMd = faUserMd
  faBookMedical = faBookMedical
  faFilePrescription = faFilePrescription
  faMicroscope = faMicroscope
  faLaptopMedical = faLaptopMedical
  faCalendarAlt = faCalendarAlt

  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig
  ) {
    this.menu = [
      {
        name: 'Formulario de citas',
        link: '',
        icon: faTachometerAlt
      },
      {
        name: 'Usuarios',
        link: 'user',
        icon: faUsers
      },
      {
        name: 'Pacientes',
        link: 'patient',
        icon: faIdCardAlt
      },
      {
        name: 'Doctores',
        link: 'doctor',
        icon: faUserMd
      },
      {
        name: 'Especialidades',
        link: 'specialty',
        icon: faBookMedical
      },
      {
        name: 'Procedimientos',
        link: 'procedure',
        icon: faFilePrescription
      },
      {
        name: 'Equipamiento',
        link: 'equipment',
        icon: faMicroscope
      },
      {
        name: 'Citas',
        link: 'appointment',
        icon: faLaptopMedical
      },
      {
        name: 'Calendario',
        link: 'calendar',
        icon: faCalendarAlt
      },
    ]
   }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  logout() {
    this.authService.logout()
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: "¿Segúro que desea cerrar sesión?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => {
        this.logout();
      },
      reject: () => {
        // Nothing
      }
    });
  }

  redirect(url:string){
    window.location.href=url    
  }

}
