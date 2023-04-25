import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerComponent } from './career/career.component';
import { MateriaComponent } from './materia/materia.component';
import { UsersComponent } from './users/users.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { InscriptionsComponent } from './inscriptions/inscriptions.component';
import { AttendancesComponent } from './attendances/attendances.component';
import { QRCodeModule } from 'angularx-qrcode';



@NgModule({
  declarations: [
    CareerComponent,
    MateriaComponent,
    UsersComponent,
    SchedulesComponent,
    InscriptionsComponent,
    AttendancesComponent
  ],
  imports: [
    CommonModule,
    QRCodeModule
  ],
  exports: [
    CareerComponent,
    MateriaComponent
  ]
})
export class PagesModule { }
