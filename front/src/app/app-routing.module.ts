import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { RoleAdminGuard } from './modules/auth/guards/role-admin.guard';
import { RoleEjecutiveGuard } from './modules/auth/guards/role-ejecutive.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },  
  {    
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },  
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [RoleAdminGuard]    
  },
  {
    path: 'patient',
    loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule),
    canActivate: [RoleEjecutiveGuard]
  },
  {
    path: 'doctor',
    loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule),
    canActivate: [RoleEjecutiveGuard]
  },
  {
    path: 'specialty',
    loadChildren: () => import('./modules/specialty/specialty.module').then(m => m.SpecialtyModule),
    canActivate: [RoleEjecutiveGuard]
  },
  {
    path: 'procedure',
    loadChildren: () => import('./modules/procedure/procedure.module').then(m => m.ProcedureModule),
    canActivate: [RoleEjecutiveGuard]
  },
  {
    path: 'equipment',
    loadChildren: () => import('./modules/equipment/equipment.module').then(m => m.EquipmentModule),
    canActivate: [RoleEjecutiveGuard]
  },
  {
    path: 'calendar',
    loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule),
    canActivate: [RoleEjecutiveGuard]
  },
  {
    path: 'appointment',
    loadChildren: () => import('./modules/appointment/appointment.module').then(m => m.AppointmentModule),
    canActivate: [RoleEjecutiveGuard]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],    
  exports: [RouterModule]
})
export class AppRoutingModule { }
