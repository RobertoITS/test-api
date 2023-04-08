import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/users.model';
import { ApiUsersService } from 'src/app/services/api.users.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users!: any[]

  //! Search
  @ViewChild('searchI') searchI!: ElementRef<HTMLInputElement>

  //* Data refresh
  subscription!: Subscription

  constructor(private api: ApiUsersService) {}

  modalNew!: HTMLElement

  ngAfterViewInit() { //! CONTROLAMOS EL CIERRE DEL MODAL
    this.modalNew = document.getElementById('new')!
    this.modalNew?.addEventListener('hidden.bs.modal', e => {
      this.resetUser()
      this.resetValues()
    })

    this.getAll()

    //* Refrescamos la vista:
    this.subscription = this.api.refresh$.subscribe(() => {
      this.api.getUsers().subscribe((data) => {
        this.users = data.result
      })
    })
  }

  getAll() {
    this.api.getUsers().subscribe(data =>{
      console.log(data.result);
      this.users = data.result
    })
  }

  getOneByParameters() {
    this.api.searchOneByParameters(this.searchI.nativeElement.value).subscribe({
      next: data => {
        this.users = data.result
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onKey(value: string) {
    if(value == '' || value == null){
      this.getAll()
    }
  }

  //! -------------------------------------------------------------------- !//
  id = ''
  last_name = ''
  name = ''
  cuil = ''
  dir = ''
  phone_number = ''
  birthdate = ''
  age = ''
  email = ''
  user_name = ''
  pass = ''
  role = ''
  file_number = ''
  changeValues(object: any) { //! CAMBIA LOS VALORES DE LOS INPUT
    this.id = object.id.toString()
    this.last_name = object.last_name
    this.name = object.name
    this.cuil = object.cuil
    this.dir = object.dir
    this.phone_number = object.phone_number
    this.birthdate = object.birthdate
    this.age = object.age
    this.email = object.email
    this.user_name = object.user_name
    this.pass = object.pass
    this.role = object.role
    this.file_number = object.file_number
  }
  //! -------------------------------------------------------------------- !//

  //! ------------------------- CREATE NEW USER ------------------------- !//
  //! VARIABLES
        //* INPUTS
  @ViewChild('nLastName') nLastName !:ElementRef<HTMLInputElement>
  @ViewChild('nName') nName !:ElementRef<HTMLInputElement>
  @ViewChild('nCuil') nCuil !:ElementRef<HTMLInputElement>
  @ViewChild('nDir') nDir !:ElementRef<HTMLInputElement>
  @ViewChild('nPhone') nPhone !:ElementRef<HTMLInputElement>
  @ViewChild('nBirthdate') nBirthdate !:ElementRef<HTMLInputElement>
  @ViewChild('nAge') nAge !:ElementRef<HTMLInputElement>
  @ViewChild('nEmail') nEmail !:ElementRef<HTMLInputElement>
  @ViewChild('nUserName') nUserName !:ElementRef<HTMLInputElement>
  @ViewChild('nPass') nPass !:ElementRef<HTMLInputElement>
  @ViewChild('nRole') nRole !:ElementRef<HTMLInputElement>
  @ViewChild('nFileNumber') nFileNumber !:ElementRef<HTMLInputElement>
  @ViewChild('nClose') nClose! : ElementRef<HTMLButtonElement>
        //* AVAILABILITY INPUT
  @ViewChild('checkedCuil') checkedCuil!: ElementRef<HTMLElement>
  @ViewChild('checkedUser') checkedUser!: ElementRef<HTMLElement>
        //* AVAILABILITY MANAGEMENT
  availableUser: boolean = false
  availableCuil: boolean = false
  //! FIRST, RESET INPUT VALUES
  resetUser(){
    this.nUserName.nativeElement.classList.remove('is-invalid')
    this.nUserName.nativeElement.classList.remove('is-valid')
    this.checkedUser.nativeElement.classList.add('text-muted')
    this.checkedUser.nativeElement.classList.remove('invalid-feedback')
    this.checkedUser.nativeElement.classList.remove('valid-feedback')
    this.checkedUser.nativeElement.innerHTML = 'Check availability'
  }
  resetCuil(){
    this.nCuil.nativeElement.classList.remove('is-invalid')
    this.nCuil.nativeElement.classList.remove('is-valid')
    this.checkedCuil.nativeElement.classList.add('text-muted')
    this.checkedCuil.nativeElement.classList.remove('invalid-feedback')
    this.checkedCuil.nativeElement.classList.remove('valid-feedback')
    this.checkedCuil.nativeElement.innerHTML = 'Check availability'
  }
  //! SECOND, CHECK AVAILABILITY
  onCheckUser(value: string){ //! USER
    if(value === '' || value === null){
      this.resetUser()
    }
    else {
      this.api.checkUserName(value).subscribe({
        next: data => {
          console.log('Found')
          this.isNotAvailable(this.nUserName, this.checkedUser)
          this.availableUser = false
          this.checkedUser.nativeElement.innerHTML = 'Not available'
        },
        error: error => {
          if(error.error.ok){
            console.log('Available')
            this.isAvailable(this.nUserName, this.checkedUser)
            this.availableUser = true
          }
          else {
            this.isNotAvailable(this.nUserName, this.checkedUser)
            this.availableUser = false
            this.checkedUser.nativeElement.innerHTML = 'Something goes wrong, try again'
          }
        }
      })
    }
  }
  onCheckCuil(value: string) {
    if(value === '' || value === null){
      this.resetCuil()
    }
    else {
      this.api.checkCuil(value).subscribe({
        next: data => {
          console.log('Found')
          this.isNotAvailable(this.nCuil, this.checkedCuil)
          this.availableCuil = false
          this.checkedCuil.nativeElement.innerHTML = 'Not available'
        },
        error: error => {
          if(error.error.ok){
            console.log('Available')
            this.isAvailable(this.nCuil, this.checkedCuil)
            this.availableCuil = true
          }
          else {
            this.isNotAvailable(this.nCuil, this.checkedCuil)
            this.availableCuil = true
            this.checkedCuil.nativeElement.innerHTML = 'Something goes wrong, try again'
          }
        }
      })
    }
  }
  isNotAvailable(input: ElementRef<HTMLInputElement>, div: ElementRef<HTMLElement>){
    input.nativeElement.classList.add('is-invalid')
    input.nativeElement.classList.remove('is-valid')
    div.nativeElement.classList.remove('text-muted')
    div.nativeElement.classList.add('invalid-feedback')
    div.nativeElement.classList.remove('valid-feedback')
  }
  isAvailable(input: ElementRef<HTMLInputElement>, div: ElementRef<HTMLElement>){
    input.nativeElement.classList.add('is-valid')
    input.nativeElement.classList.remove('is-invalid')
    div.nativeElement.classList.remove('text-muted')
    div.nativeElement.classList.add('valid-feedback')
    div.nativeElement.classList.remove('invalid-feedback')
    div.nativeElement.innerHTML = 'Available'
  }
  //! THIRD, IF AVAILABLE, THEN POST ONE
  postOne() {
    const user: Users = { //! CREAMOS EL OBJETO
      id: '',
      last_name: this.nLastName.nativeElement.value,
      name: this.nName.nativeElement.value,
      cuil: this.nCuil.nativeElement.value,
      dir: this.nDir.nativeElement.value,
      phone_number: this.nPhone.nativeElement.value,
      birthdate: this.nBirthdate.nativeElement.value,
      age: this.nAge.nativeElement.value,
      email: this.nEmail.nativeElement.value,
      user_name: this.nUserName.nativeElement.value,
      pass: this.nPass.nativeElement.value,
      role: this.nRole.nativeElement.value,
      file_number: this.nFileNumber.nativeElement.value
    }
    if(this.availableCuil && this.availableUser) {
      this.onCheckUser(user.user_name) //! CHEQUEAMOS NUEVAMENTE
      this.onCheckCuil(user.cuil) //! CHEQUEAMOS NUEVAMENTE
      if(this.availableUser && this.availableCuil){
        this.api.register(user).subscribe({
          next: data => {
            console.log(data.result);
            this.nClose.nativeElement.click()
          }
        })
      }
      else {
        this.nClose.nativeElement.click() //! CIERRA EL MODAL
      }
    }
  }
  resetValues(){
    this.nLastName.nativeElement.value = ''
    this.nName.nativeElement.value = ''
    this.nCuil.nativeElement.value = ''
    this.nDir.nativeElement.value = ''
    this.nPhone.nativeElement.value = ''
    this.nBirthdate.nativeElement.value = ''
    this.nAge.nativeElement.value = ''
    this.nEmail.nativeElement.value = ''
    this.nUserName.nativeElement.value = ''
    this.nPass.nativeElement.value = ''
    this.nRole.nativeElement.value = ''
    this.nFileNumber.nativeElement.value = ''
  }
  //! ------------------------- CREATE NEW USER ------------------------- !//


  //! ---------------------------- EDIT USER ---------------------------- !//
  //! VARIABLE
        //* Inputs
  @ViewChild('eId') eId! :ElementRef<HTMLInputElement>
  @ViewChild('eLastName') eLastName !:ElementRef<HTMLInputElement>
  @ViewChild('eName') eName !:ElementRef<HTMLInputElement>
  @ViewChild('eCuil') eCuil !:ElementRef<HTMLInputElement>
  @ViewChild('eDirection') eDir !:ElementRef<HTMLInputElement>
  @ViewChild('ePhone') ePhone !:ElementRef<HTMLInputElement>
  @ViewChild('eBirthdate') eBirthdate !:ElementRef<HTMLInputElement>
  @ViewChild('eAge') eAge !:ElementRef<HTMLInputElement>
  @ViewChild('eEmail') eEmail !:ElementRef<HTMLInputElement>
  @ViewChild('eUserName') eUserName !:ElementRef<HTMLInputElement>
  @ViewChild('ePass') ePass !:ElementRef<HTMLInputElement>
  @ViewChild('eRole') eRole !:ElementRef<HTMLInputElement>
  @ViewChild('eFileNumber') eFileNumber !:ElementRef<HTMLInputElement>
  @ViewChild('eClose') eClose!: ElementRef<HTMLButtonElement>

  putOne() {
    const user: Users = { //! CREAMOS EL OBJETO
      id: this.eId.nativeElement.value,
      last_name: this.eLastName.nativeElement.value,
      name: this.eName.nativeElement.value,
      cuil: this.eCuil.nativeElement.value,
      dir: this.eDir.nativeElement.value,
      phone_number: this.ePhone.nativeElement.value,
      birthdate: this.eBirthdate.nativeElement.value,
      age: this.eAge.nativeElement.value,
      email: this.eEmail.nativeElement.value,
      user_name: this.eUserName.nativeElement.value,
      pass: this.ePass.nativeElement.value,
      role: this.eRole.nativeElement.value,
      file_number: this.eFileNumber.nativeElement.value
    }
    this.api.putUser(user, user.id).subscribe({
      next: data => {
        console.log(data)
        this.eClose.nativeElement.click()
      },
      error: error => {
        console.log(error);

      }
    })
  }
  //! ---------------------------- EDIT USER ---------------------------- !//


  //! --------------------------- DELETE USER --------------------------- !//
  deleteOne() {
    var answer = window.confirm('Delete record?')
    if (answer) {
      this.api.deleteOne(this.id).subscribe(data => {
        console.log(data);
        this.eClose.nativeElement.click()
      })
    } else {
      this.eClose.nativeElement.click()
    }
  }
  //! --------------------------- DELETE USER --------------------------- !//
}
