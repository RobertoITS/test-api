import { Component, ElementRef, ViewChild } from '@angular/core';
import { Login } from '../models/login.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ApiUsersService } from '../services/api.users.service';
import * as crypto from 'crypto-js'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * ! AL LOGEARSE EL USUARIO, EN LAS COOKIES SE GUARDA SU ROL ENCRIPTADO
 * ! Y EL TOKEN DE AUTENTICACION
 * ! ¿POR QUÉ SE ENCRIPTA EL ROL? PORQUE SE PUEDE MODIFICAR DESDE EL NAVEGADOR (MAS SEGURIDAD)
 * !¿POR QUÉ SE PONE DURACIÓN AL TOKEN? PARA QUE RENUEVE EL ACCESO (MAS SEGURIDAD)
 */

export class LoginComponent {

  //* Instanciamos los inputs
  @ViewChild('username') username!: ElementRef<HTMLInputElement>
  @ViewChild('pass') pass!: ElementRef<HTMLInputElement>

  constructor(private api: ApiUsersService, private cookieService: CookieService, private router: Router) {}

  //! Funcion del LOGIN
  login() {

    let form: Login = {
      username: this.username.nativeElement.value,
      pass: this.pass.nativeElement.value
    }

    //! PODEMOS MANEJAR LOS BAD REQUEST!!
    this.api.login(form).subscribe({
      next: data => {
        console.log(data.token);
        //! ESTE COOKIE TIENE UNA EXPIRACION DE 15 MINUTOS
        //! LAMENTABLEMENTE USA FORMATO DIA, ASI QUE SI HACEMOS POR HORA, SERIA x-horas/24 = valor
        //! SI LO HACEMOS EN MINUTO; SERIA x-minutos/1440 = valor
        this.cookieService.set('x-token', data.token, 0.010416667) //* Guardamos el token en las cookies
        this.cookieService.set('MD5',crypto.MD5(data.result[0].role).toString()) //* Guardamos el rol encriptado
        this.router.navigate(['dashboard'])
      },
      error: error => { console.log(error.error.msg) }
    })
  }
}
