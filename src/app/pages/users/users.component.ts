import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

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
  @ViewChild('nPhoneNumber') nPhoneNumber !:ElementRef<HTMLInputElement>
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
  @ViewChild('eDir') eDir !:ElementRef<HTMLInputElement>
  @ViewChild('ePhoneNumber') ePhoneNumber !:ElementRef<HTMLInputElement>
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

    //! Search
    @ViewChild('searchI') searchI!: ElementRef<HTMLInputElement>

    //* Data refresh
    subscription!: Subscription

  getOneByParameters() {

  }

  deleteOne() {

  }

  putOne() {

  }

  postOne() {

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
