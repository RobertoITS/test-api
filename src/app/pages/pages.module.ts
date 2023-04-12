import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerComponent } from './career/career.component';
import { MateriaComponent } from './materia/materia.component';
import { UsersComponent } from './users/users.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { InscriptionsComponent } from './inscriptions/inscriptions.component';



@NgModule({
  declarations: [
    CareerComponent,
    MateriaComponent,
    UsersComponent,
    SchedulesComponent,
    InscriptionsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CareerComponent,
    MateriaComponent
  ]
})
export class PagesModule { }
