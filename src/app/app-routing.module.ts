import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CareerComponent } from './career/career.component';
import { MateriaComponent } from './materia/materia.component';
import { CommissionComponent } from './commission/commission.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'career', component: CareerComponent },
  { path: 'materia', component: MateriaComponent },
  { path: 'commission', component: CommissionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
