import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
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
  //* Data refresh
  // Refresh the data when it's edited
  subscription!: Subscription

  constructor(
      private apiCareers: ApiCareerService,
      private apiTeachers: ApiUsersService,
      private apiMateria: ApiMateriaService
    ) {  }

  modalNew!: HTMLElement // -----> Modal variable

  ngAfterViewInit(){
    // Here we call the modal function to capture when it is closed
    this.modalNew = document.getElementById('new')!
    this.modalNew?.addEventListener('hidden.bs.modal', e => {
      this.resetValues() // ---------> Reset the input values
    })

    // Get all the data
    this.getAll()

    //! RELATIONAL SECTION ------------------------->
    this.getTeachers()
    this.getCareers()
    //! RELATIONAL SECTION ------------------------->

    // Refresh the view
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

  //* -------------------------- API METHODS -------------------------- *//

  //! -------------------------- GET -------------------------- !//
  //? VARIABLES
  materias: any[] = []
  @ViewChild('searchI') searchI!: ElementRef<HTMLInputElement> // ---------> Search input
  //? METHODS
  // Get all data from the database
  getAll() {
    this.apiMateria.getMaterias().subscribe({
      next: data => { this.materias = data.result },
      error: error => { console.log(error) }
    })
  }
  // Get the data from one parameter (any one)
  getOneByParameters(){
    this.apiMateria.getOneByParameter(this.searchI.nativeElement.value).subscribe({
      next: data => {this.materias = data.result},
      error: error => { console.log(error) }
    })
  }
  // View changes in the search input, if it's empty, then bring back all the records
  onKey(value: string) {
    if(value == '' || value == null){
      this.getAll()
    }
  }
  //! -------------------------- GET -------------------------- !//

  //! -------------------------- POST -------------------------- !//
  //? VARIABLES
  @ViewChild('nName') nName!: ElementRef<HTMLInputElement>
  @ViewChild('nProfessor') nProfessor!: ElementRef<HTMLSelectElement>
  @ViewChild('nActualYear') nActualYear!: ElementRef<HTMLInputElement>
  @ViewChild('nClassesQuantity') nClassesQuantity!: ElementRef<HTMLInputElement>
  @ViewChild('nCareer') nCareer!: ElementRef<HTMLInputElement>
  @ViewChild('nClose') nClose!: ElementRef<HTMLButtonElement>
  //? METHODS
  // Post one new record
  postOne() {
    const object: Materia = { // Create the object (inputs values)
      id: '',
      materia_name: this.nName.nativeElement.value,
      professor_id: +this.nProfessor.nativeElement.value,
      actual_year: this.nActualYear.nativeElement.value,
      classes_quantity: +this.nClassesQuantity.nativeElement.value,
      career_id: +this.nCareer.nativeElement.value
    }
    this.apiMateria.postOne(object).subscribe({
      next: data => {
        this.nClose.nativeElement.click() // Close the modal
        this.nName.nativeElement.value = ''
        this.nProfessor.nativeElement.value = ''
        this.nActualYear.nativeElement.value = '' // ---------> Empty inputs
        this.nClassesQuantity.nativeElement.value = ''
        this.nCareer.nativeElement.value = ''
      },
      error: error => { console.log(error) }  //! ----> Capture the error
    })
  }
  //! -------------------------- POST -------------------------- !//

  //! -------------------------- PUT -------------------------- !//
  //? VARIABLES
  @ViewChild('eId') eId!: ElementRef<HTMLInputElement>
  @ViewChild('eName') eName!: ElementRef<HTMLInputElement>
  @ViewChild('eProfessor') eProfessor!: ElementRef<HTMLInputElement>
  @ViewChild('eActualYear') eActualYear!: ElementRef<HTMLInputElement>
  @ViewChild('eClassesQuantity') eClassesQuantity!: ElementRef<HTMLInputElement>
  @ViewChild('eCareer') eCareer!: ElementRef<HTMLInputElement>
  @ViewChild('eClose') eClose!: ElementRef<HTMLButtonElement>
  id: string = ''
  name: string = ''
  professor: string ='' // --------------> This variables are the input fields value
  actual_year: string = ''
  classes_quantity: string = ''
  career: string = ''
  //? METHODS
  // Put a record
  putOne() {
    const materia: Materia = { // Create the object
      id: this.eId.nativeElement.value,
      materia_name: this.eName.nativeElement.value,
      professor_id: +this.eProfessor.nativeElement.value,
      actual_year: this.eActualYear.nativeElement.value,
      classes_quantity: +this.eClassesQuantity.nativeElement.value,
      career_id: +this.eCareer.nativeElement.value
    }
    this.apiMateria.putOne(materia).subscribe({
      next: data => { this.eClose.nativeElement.click() }, // Close the modal
      error: error => { console.log(error) } //! ----> Capture the error
    })
  }
  //! -------------------------- PUT -------------------------- !//

  //! -------------------------- DELETE -------------------------- !//
  //? NO VARIABLES
  //? METHODS
  // Delete one record
  deleteOne() {
    var answer = window.confirm('Delete record?') // ------> Alert message
    if (answer) { // -----> true = delete
      this.apiMateria.deleteOne(this.id).subscribe({
        next: data => { this.eClose.nativeElement.click() }, // ----> Closes the modal
        error: error => { console.log(error) } //! ----> Capture the error
      })
    } else { // ------> false = return
      this.eClose.nativeElement.click() // ----> Closes the modal
    }
  }
  //! -------------------------- DELETE -------------------------- !//

  // Changes input values when we open a record from the list
  changeValues(object: any) {
    this.id = object.id.toString()
    this.name = object.materia_name
    this.actual_year = object.actual_year
    this.classes_quantity = object.classes_quantity
    //! IN SELECT TAG, [value]="variable", SELECT THE VALUE ID
    this.career = object.career_id
    this.professor = object.professor_id
  }

  //! -------------------- RELATIONAL SECTION -------------------- !//
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
  //! -------------------- RELATIONAL SECTION -------------------- !//
}
