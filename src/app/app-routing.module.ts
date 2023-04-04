import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CareerComponent } from './pages/career/career.component';
import { MateriaComponent } from './pages/materia/materia.component';
import { CommissionComponent } from './pages/commission/commission.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'career', component: CareerComponent },
  { path: 'materia', component: MateriaComponent },
  { path: 'commission', component: CommissionComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
