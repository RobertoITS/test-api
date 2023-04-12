import { Component, ElementRef, ViewChild } from '@angular/core';
import { Career } from '../../models/career.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApiCareerService } from 'src/app/services/api.career.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent {
  //* Data refresh
  // Refresh the data when it's edited
  subscription!: Subscription

  constructor(private api: ApiCareerService){}

  ngAfterViewInit(){
    // Get all the data
    this.getAll()

    // Refresh the view
    this.subscription = this.api.refresh$.subscribe(() => {
      this.api.getCareer().subscribe((data) => {
        this.careers = data.result
      })
    })
  }

  //* -------------------------- API METHODS -------------------------- *//

  //! -------------------------- GET -------------------------- !//
  //? VARIABLES
  careers: any[] = []
  @ViewChild('searchI') searchI!: ElementRef<HTMLInputElement> // -------> Search input
  //? METHODS
  // Get all data from de database
  getAll(){
    this.api.getCareer().subscribe(data => {
      this.careers = data.result
    })
  }
  // Get the data from one parameter (any one)
  getOneByParameters(){
    this.api.searchOneByParameters(this.searchI.nativeElement.value).subscribe((data) => {
      this.careers = data.result
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
  @ViewChild('nDescription') nDescription!: ElementRef<HTMLInputElement>
  @ViewChild('nDuration') nDuration!: ElementRef<HTMLInputElement>
  @ViewChild('nClose') nClose!: ElementRef<HTMLButtonElement>
  //? METHODS
  // Post one new record
  postOne() {
    const object: Career = { // Create the object (inputs values)
      id: '',
      name: this.nName.nativeElement.value,
      description: this.nDescription.nativeElement.value,
      duration: this.nDuration.nativeElement.value
    }
    this.api.postCareer(object).subscribe({
      next: data => {
        this.nClose.nativeElement.click() // Close the modal
        this.nName.nativeElement.value = ''
        this.nDescription.nativeElement.value = '' // ---------> Empty inputs
        this.nDuration.nativeElement.value = ''
      },
      error: error => { console.log(error) } //! ----> Capture the error
    })
  }
  //! -------------------------- POST -------------------------- !//

  //! -------------------------- PUT -------------------------- !//
  //? VARIABLES
  @ViewChild('eId') eId!: ElementRef<HTMLInputElement>
  @ViewChild('eName') eName!: ElementRef<HTMLInputElement>
  @ViewChild('eDescription') eDescription!: ElementRef<HTMLInputElement>
  @ViewChild('eDuration') eDuration!: ElementRef<HTMLInputElement>
  @ViewChild('eClose') eClose!: ElementRef<HTMLButtonElement>
  id: string = ''
  name: string = ''
  description: string ='' // --------------> This variables are the input fields value
  duration: string = ''
  //? METHODS
  // Put a record
  putOne() {
    const career: Career = { // Create the object
      id: this.eId.nativeElement.value,
      name: this.eName.nativeElement.value,
      description: this.eDescription.nativeElement.value,
      duration: this.eDuration.nativeElement.value
    }
    this.api.putCareer(this.id, career).subscribe({
      next: data => { this.eClose.nativeElement.click() }, // Closes the modal
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
      this.api.deleteCareer(this.id).subscribe({
        next: data => { this.eClose.nativeElement.click() }, // ----> Closes the modal
        error: error => { console.log(error) } //! ----> Capture the error
      })
    }
    else { // ------> false = return
      this.eClose.nativeElement.click() // ----> Closes the modal
    }
  }
  //! -------------------------- DELETE -------------------------- !//

  // Changes input values when we open a record from the list
  changeValues(object: any) {
    this.id = object.id.toString()
    this.name = object.name
    this.description = object.description
    this.duration = object.duration
  }
}
