import { Component, ElementRef, ViewChild } from '@angular/core';
import { error } from 'jquery';
import { Subscription } from 'rxjs';
import { Career } from 'src/app/models/career.model';
import { Materia } from 'src/app/models/materia.model';
import { ApiCareerService } from 'src/app/services/api.career.service';
import { ApiMateriaService } from 'src/app/services/api.materia.service';
import { ApiUsersService } from 'src/app/services/api.users.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent {
  //! Edit
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

  //! Search
  @ViewChild('searchI') searchI!: ElementRef<HTMLInputElement>

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

  putOne() {
    const career: Career = {
      id: this.eId.nativeElement.value,
      name: this.eName.nativeElement.value,
      description: 'this.eDescription.nativeElement.value',
      duration: 'this.eDuration.nativeElement.value'
    }
    this.apiCareers.putCareer(this.id, career).subscribe(data => {
      console.log(data);
      this.eClose.nativeElement.click()
    })
  }
  deleteOne() {
    var answer = window.confirm('Delete record?')
    if (answer) {
      this.apiCareers.deleteCareer(this.id).subscribe(data => {
        console.log(data);
        this.eClose.nativeElement.click()
      })
    } else {
      this.eClose.nativeElement.click()
    }
  }
  getOneByParameters(){
    this.apiCareers.searchOneByParameters(this.searchI.nativeElement.value).subscribe((data) => {
      this.materias = data.result
    })
  }
  //* captura los cambios en el input
  onKey(value: string) {
    if(value == '' || value == null){
      this.getCareers()
    }
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
