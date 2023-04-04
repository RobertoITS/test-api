import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerComponent } from './career/career.component';
import { CommissionComponent } from './commission/commission.component';
import { MateriaComponent } from './materia/materia.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    CareerComponent,
    CommissionComponent,
    MateriaComponent,
    UsersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CareerComponent,
    CommissionComponent,
    MateriaComponent
  ]
})
export class PagesModule { }
