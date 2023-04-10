import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Materia } from 'src/app/models/materia.model';
import { ApiCareerService } from 'src/app/services/api.career.service';
import { ApiMateriaService } from 'src/app/services/api.materia.service';
import { ApiUsersService } from 'src/app/services/api.users.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent {
  //* Data refresh
  subscription!: Subscription

  constructor(
      private apiCareers: ApiCareerService,
      private apiTeachers: ApiUsersService,
      private apiMateria: ApiMateriaService
    ) {  }

  modalNew!: HTMLElement

  ngAfterViewInit(){
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
    this.nName.nativeElement.value = ''
    this.nProfessor.nativeElement.value = ''
    this.nActualYear.nativeElement.value = ''
    this.nClassesQuantity.nativeElement.value = ''
    this.nCareer.nativeElement.value = ''
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
  @ViewChild('nName') nName!: ElementRef<HTMLInputElement>
  @ViewChild('nProfessor') nProfessor!: ElementRef<HTMLSelectElement>
  @ViewChild('nActualYear') nActualYear!: ElementRef<HTMLInputElement>
  @ViewChild('nClassesQuantity') nClassesQuantity!: ElementRef<HTMLInputElement>
  @ViewChild('nCareer') nCareer!: ElementRef<HTMLInputElement>
  @ViewChild('nClose') nClose!: ElementRef<HTMLButtonElement>

  postOne() {
    const object: Materia = {
      id: '',
      name: this.nName.nativeElement.value,
      professor_id: +this.nProfessor.nativeElement.value,
      actual_year: this.nActualYear.nativeElement.value,
      classes_quantity: +this.nClassesQuantity.nativeElement.value,
      career_id: +this.nCareer.nativeElement.value
    }

    this.apiMateria.postOne(object).subscribe({
      next: data => {
        console.log(data);
        this.nClose.nativeElement.click()
        this.nName.nativeElement.value = ''
        this.nProfessor.nativeElement.value = ''
        this.nActualYear.nativeElement.value = ''
        this.nClassesQuantity.nativeElement.value = ''
        this.nCareer.nativeElement.value = ''
      },
      error: error => { console.log(error) }
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
