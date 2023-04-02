import { Component, ElementRef, ViewChild } from '@angular/core';
import { Login } from '../models/login.model';
import { ApiService } from '../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //* Instanciamos los inputs
  @ViewChild('username') username!: ElementRef<HTMLInputElement>
  @ViewChild('pass') pass!: ElementRef<HTMLInputElement>

  constructor(private api: ApiService, private cookieService: CookieService, private router: Router) {}

  //! Funcion del LOGIN
  login() {

    let form: Login = {
      username: this.username.nativeElement.value,
      pass: this.pass.nativeElement.value
    }

    //! PODEMOS MANEJAR LOS BAD REQUEST!!
    this.api.login(form).subscribe({
      next: data => {

        //? Matias: Extraemos el objeto usuario de la respuesta y lo asignamos a variable user
        //this.user = data.result[0]

        //? Matias: guardamos el user object en string en localstorage
        //this.storage.setObject(this.user, 'user') //? key = 'user'

        console.log(data.token)
        this.cookieService.set('x-token', data.token) //* Guardamos el token en las cookies

        // TODO: Matias: CREAR UN SWITCH CASE DEPENDIENDO EL ROL DEL USUARIO
        this.router.navigate(['dashboard'])
      },
      error: error => { console.log(error.error.msg) }
    })
  }
}
