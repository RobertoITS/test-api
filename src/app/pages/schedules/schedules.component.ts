import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Materia } from 'src/app/models/materia.model';
import { Schedules } from 'src/app/models/schedules.model';
import { ApiCareerService } from 'src/app/services/api.career.service';
import { ApiMateriaService } from 'src/app/services/api.materia.service';
import { ApiSchedulesService } from 'src/app/services/api.schedules.service';
import { ApiUsersService } from 'src/app/services/api.users.service';
import * as bootstrap from 'bootstrap'

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent {
  //* Data refresh
  subscription!: Subscription

  constructor(
      private apiSchedules: ApiSchedulesService,
      private apiCareers: ApiCareerService,
      private apiTeachers: ApiUsersService,
      private apiMateria: ApiMateriaService
    ) {  }

  modalNew!: HTMLElement

  message!: HTMLElement

  ngAfterViewInit(){
    this.message = document.getElementById('message')!

    this.modalNew = document.getElementById('new')!
    this.modalNew?.addEventListener('hidden.bs.modal', e => {
      this.resetValues()
    })

    //* Obtenemos todos los datos
    this.getAll()

    //! RELATIONAL SECTION ------------------------->
    this.getTeachers()
    this.getCareers()
    //! RELATIONAL SECTION ------------------------->

    //* Refrescamos la vista:
    this.subscription = this.apiMateria.refresh$.subscribe(() => {
      this.apiMateria.getMaterias().subscribe({
        next: data => { this.materias = data.result },
        error: error => { console.log(error) }
      })
    })
  }

  resetValues() {
    this.nDay.nativeElement.value = ''
    this.nSchedule.nativeElement.value = ''
  }

  changeValues(object: any) {
    this.id = object.id.toString()
    this.name = object.name
    this.actual_year = object.actual_year
    this.classes_quantity = object.classes_quantity
    //! EN LA ETIQUETA SELECT, [value]="variable", SELECCIONA LA OPCION QUE YA TIENE EL NOMBRE
    this.career = object.career_id
    this.professor = object.professor_id
  }

  //! ------------------ GET SECTION ------------------ !//
  materias: any[] = []
  getAll() {
    this.apiMateria.getMaterias().subscribe({
      next: data => { this.materias = data.result },
      error: error => { console.log(error) }
    })
  }

  //! Search
  @ViewChild('searchI') searchI!: ElementRef<HTMLInputElement>
  getOneByParameters(){
    this.apiMateria.getOneByParameter(this.searchI.nativeElement.value).subscribe({
      next: data => {this.materias = data.result},
      error: error => { console.log(error) }
    })
  }
  //* captura los cambios en el input
  onKey(value: string) {
    if(value == '' || value == null){
      this.getAll()
    }
  }
  //! ------------------ GET SECTION ------------------ !//

  //! ------------------ POST SECTION ------------------ !//
  @ViewChild('nDay') nDay!: ElementRef<HTMLSelectElement>
  @ViewChild('nSchedule') nSchedule!: ElementRef<HTMLSelectElement>
  @ViewChild('nClose') nClose!: ElementRef<HTMLButtonElement>
  messageAlert = ''
  postOne() {
    const object: Schedules = {
      id: +(this.nDay.nativeElement.value + this.nSchedule.nativeElement.value),
      class_day: this.nDay.nativeElement.options[this.nDay.nativeElement.selectedIndex].text,
      class_schedule: this.nSchedule.nativeElement.options[this.nSchedule.nativeElement.selectedIndex].text,
    }
    this.apiSchedules.postOne(object).subscribe({
      next: data => {
        console.log(data)
        this.nClose.nativeElement.click()
      },
      error: error => {
        console.log(error.error.e.code)
        if(error.error.e.code == 'ER_DUP_ENTRY'){
          this.messageAlert = 'Duplicated entry'
          const toast = bootstrap.Toast.getOrCreateInstance(this.message)
          toast.show()
        }
      }
    })
  }
  //! ------------------ POST SECTION ------------------ !//

  //! ------------------- PUT SECTION ------------------- !//
  @ViewChild('eId') eId!: ElementRef<HTMLInputElement>
  @ViewChild('eName') eName!: ElementRef<HTMLInputElement>
  @ViewChild('eProfessor') eProfessor!: ElementRef<HTMLInputElement>
  @ViewChild('eActualYear') eActualYear!: ElementRef<HTMLInputElement>
  @ViewChild('eClassesQuantity') eClassesQuantity!: ElementRef<HTMLInputElement>
  @ViewChild('eCareer') eCareer!: ElementRef<HTMLInputElement>
  @ViewChild('eClose') eClose!: ElementRef<HTMLButtonElement>
  id: string = ''
  name: string = ''
  professor: string =''
  actual_year: string = ''
  classes_quantity: string = ''
  career: string = ''

  putOne() {
    const materia: Materia = {
      id: this.eId.nativeElement.value,
      name: this.eName.nativeElement.value,
      professor_id: +this.eProfessor.nativeElement.value,
      actual_year: this.eActualYear.nativeElement.value,
      classes_quantity: +this.eClassesQuantity.nativeElement.value,
      career_id: +this.eCareer.nativeElement.value
    }
    this.apiMateria.putOne(materia).subscribe({
      next: data => { this.eClose.nativeElement.click() },
      error: error => { console.log(error) }
    })
  }
  //! ------------------- PUT SECTION ------------------- !//

  //! ------------------ DELETE SECTION ------------------ !//
  deleteOne() {
    var answer = window.confirm('Delete record?')
    if (answer) {
      this.apiMateria.deleteOne(this.id).subscribe({
        next: data => { this.eClose.nativeElement.click() },
        error: error => { console.log(error) }
      })
    } else {
      this.eClose.nativeElement.click()
    }
  }
  //! ------------------ DELETE SECTION ------------------ !//

  //! --------------- RELATIONAL SECTION --------------- !//
    //! TEACHERS
  teachers: any[] = []
  getTeachers(){
    this.apiTeachers.getTeachers().subscribe({
      next: data => { this.teachers = data.result },
      error: error => { console.log(error) }
    })
  }

    //! CAREERS
  careers: any[] = []
  getCareers(){
    this.apiCareers.getCareer().subscribe({
      next: data => {this.careers = data.result},
      error: error => { console.log(error) }
    })
  }
  //! --------------- RELATIONAL SECTION --------------- !//
}
