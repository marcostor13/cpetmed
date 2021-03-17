import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasspageComponent } from './passpage.component';

const routes: Routes = [
  {
    path:'',
    component: PasspageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasspageRoutingModule { }
