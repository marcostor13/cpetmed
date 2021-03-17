import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAdminGuard } from './../auth/guards/role-admin.guard';

const routes: Routes = [
  {
    path: 'landings',
    loadChildren: () => import('./landings/landings.module').then(m => m.LandingsModule),
    canActivate: [RoleAdminGuard]
  }, 
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule),
    canActivate: [RoleAdminGuard]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
