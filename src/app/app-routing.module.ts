import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CareerComponent } from './pages/career/career.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './middleware/guard/auth.guard';
import { PermissionsGuard } from './middleware/guard/permissions.guard';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { MateriaComponent } from './pages/materia/materia.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'career', component: CareerComponent, canActivate: [AuthGuard, PermissionsGuard], data: { role: ['ADMIN', 'SUSER'] } },
  { path: 'materia', component: MateriaComponent, canActivate: [AuthGuard, PermissionsGuard], data: { role: ['ADMIN', 'SUSER', 'TEACHER'] } },
  { path: 'schedules', component: SchedulesComponent, canActivate: [AuthGuard, PermissionsGuard], data: { role: ['ADMIN', 'SUSER', 'TEACHER', 'STUDENT'] } },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, PermissionsGuard], data: { role: ['ADMIN', 'SUSER'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
