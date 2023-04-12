import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Schedules } from 'src/app/models/schedules.model';
import { ApiSchedulesService } from 'src/app/services/api.schedules.service';
import * as bootstrap from 'bootstrap'

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent {
  //* Data refresh
  // Refresh the data when it's edited
  subscription!: Subscription

  constructor(private apiSchedules: ApiSchedulesService) {  }

  modalNew!: HTMLElement // -----> Modal variable

  message!: HTMLElement // ------> Toast variable

  ngAfterViewInit(){

    this.message = document.getElementById('message')! // ----> Instance of the variable

    // Here we call the modal function to capture when it is closed
    this.modalNew = document.getElementById('new')!
    this.modalNew?.addEventListener('hidden.bs.modal', e => {
      this.resetValues() // ---------> Reset the input values
    })

    // Get all the data
    this.getAll()

    // Refresh the view
    this.subscription = this.apiSchedules.refresh$.subscribe(() => {
      this.apiSchedules.getAll().subscribe({
        next: data => { this.schedules = data.result },
        error: error => { console.log(error) }
      })
    })
  }

  resetValues() {
    this.nDay.nativeElement.value = ''
    this.nSchedule.nativeElement.value = ''
  }

  //* -------------------------- API METHODS -------------------------- *//

  //! -------------------------- GET -------------------------- !//
  //? VARIABLES
  schedules: Schedules[] = []
  @ViewChild('searchI') searchI!: ElementRef<HTMLInputElement> // -------> Search input
  //? METHODS
  // Get all data from de database
  getAll() {
    this.apiSchedules.getAll().subscribe({
      next: data => { this.schedules = data.result },
      error: error => { console.log(error) }
    })
  }
  // Get the data from one parameter (any one)
  getOneByParameters(){
    this.apiSchedules.getOneByParameter(this.searchI.nativeElement.value).subscribe({
      next: data => {this.schedules = data.result },
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
  @ViewChild('nDay') nDay!: ElementRef<HTMLSelectElement>
  @ViewChild('nSchedule') nSchedule!: ElementRef<HTMLSelectElement>
  @ViewChild('nClose') nClose!: ElementRef<HTMLButtonElement>
  messageAlert = '' // -------> Message alert
  //? METHODS
  // Post one new record
  postOne() {
    const object: Schedules = { // Create the object (inputs values)
      id: +(this.nDay.nativeElement.value + this.nSchedule.nativeElement.value), // --> "+" = toInt()
      class_day: this.nDay.nativeElement.options[this.nDay.nativeElement.selectedIndex].text, // --> Get the index of the select tag
      class_schedule: this.nSchedule.nativeElement.options[this.nSchedule.nativeElement.selectedIndex].text // --> Get the index of the select tag
    }
    this.apiSchedules.postOne(object).subscribe({
      next: data => {
        this.nClose.nativeElement.click() // Close the modal
        this.nDay.nativeElement.value = ''
        this.nSchedule.nativeElement.value = '' // ---------> Empty inputs
      },
      error: error => { //! ----> Capture the error
        console.log(error.error.e.code)
        if(error.error.e.code == 'ER_DUP_ENTRY'){ // -----> If the entry is duplicated, show the toast
          this.messageAlert = 'Duplicated entry'
          const toast = bootstrap.Toast.getOrCreateInstance(this.message)
          toast.show()
        }
      }
    })
  }
  //! -------------------------- POST -------------------------- !//

  //! -------------------------- PUT -------------------------- !//
  //? VARIABLES
  @ViewChild('eId') eId!: ElementRef<HTMLInputElement>
  @ViewChild('eClassDay') eName!: ElementRef<HTMLInputElement>
  @ViewChild('eClassSchedule') eProfessor!: ElementRef<HTMLInputElement>
  @ViewChild('eClose') eClose!: ElementRef<HTMLButtonElement>
  id: string = ''
  class_day: string = '' // --------------> This variables are the input fields value
  class_schedule: string =''
  //? METHODS
  // Put a record
  putOne() {
    const schedule: Schedules = { // Create the object
      id: +this.eId.nativeElement.value,
      class_day: this.eName.nativeElement.value,
      class_schedule: this.eProfessor.nativeElement.value,
    }
    this.apiSchedules.putOne(schedule).subscribe({
      next: data => { this.eClose.nativeElement.click() }, // Closes the modal
      error: error => { console.log(error) } //! ----> Capture the error
    })
  }
  //! -------------------------- PUT -------------------------- !//

  //! -------------------------- DELETE -------------------------- !//
  //? NO VARIABLES
  //? METHODS
  // Delete one record
  deleteOne() { // ------> Alert message
    var answer = window.confirm('Delete record?')
    if (answer) { // -----> true = delete
      this.apiSchedules.deleteOne(this.id).subscribe({
        next: data => { this.eClose.nativeElement.click() }, // ----> Closes the modal
        error: error => { console.log(error) } //! ----> Capture the error
      })
    }
    else { // ------> false = return
      this.eClose.nativeElement.click() // ----> Closes the modal
    }
  }
  //! ------------------ DELETE SECTION ------------------ !//

  // Changes input values when we open a record from the list
  changeValues(object: any) {
    this.id = object.id.toString()
    this.class_day = object.class_day
    this.class_schedule = object.class_schedule
  }
}
