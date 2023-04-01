import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/users.model';
import { ApiUsersService } from 'src/app/services/api.users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users!: any[]

  //! New
  @ViewChild('nId') nId! :ElementRef<HTMLInputElement>
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

  //! Edit
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

  //! Disponibilidad
  @ViewChild('checked') checked!: ElementRef<HTMLElement>
  @ViewChild('checkedButton') checkedButton!: ElementRef<HTMLButtonElement>

  //! Search
  @ViewChild('searchI') searchI!: ElementRef<HTMLInputElement>

  //* Data refresh
  subscription!: Subscription

  constructor(private api: ApiUsersService) {}

  ngOnInit() {
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

  }

  deleteOne() {

  }

  putOne() {

  }

  postOne() {
    const user: Users = {
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
    this.api.checkUserName(user.cuil).subscribe({
      next: data => {
        console.log('Found')
        this.nCuil.nativeElement.classList.add('is-invalid')
        this.nCuil.nativeElement.classList.remove('is-valid')
        this.checked.nativeElement.classList.remove('text-muted')
        this.checked.nativeElement.classList.add('invalid-feedback')
        this.checked.nativeElement.classList.remove('valid-feedback')
      },
      error: error => {
        if(error.error.ok){
          console.log('Available');
          this.nCuil.nativeElement.classList.add('is-valid')
          this.nCuil.nativeElement.classList.remove('is-invalid')
          this.checked.nativeElement.classList.remove('text-muted')
          this.checked.nativeElement.classList.add('valid-feedback')
          this.checked.nativeElement.classList.remove('invalid-feedback')
        }
        else {
          console.log('Bad request');
        }
      }
    })
  }

  onKey(event: string) {

  }

  changeValues(object: any) {

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

}
