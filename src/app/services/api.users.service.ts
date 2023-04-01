import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  url: string = 'http://localhost:3000/api/'

  private _refresh$ = new Subject<void>() //* Una subscripcion para actualizar los datos en tiempo real

  get refresh$(){ //* La funcion para refrescar los datos
    return this._refresh$
  }

  constructor(private http: HttpClient) { }

    //! PARA MANEJAR LOS BAD REQUEST
    handleError(error: HttpErrorResponse) {
      return throwError(() => error)
    }

  //! Login service
  login(form: Login): Observable<any> {
    let direction: string = this.url + 'auth/login'
    return this.http.post<any>(direction, form).pipe(catchError(this.handleError))
  }

  //! Get users
  getUsers(): Observable<any> {
    let direction: string = this.url + 'users'
    return this.http.get<any>(direction).pipe(catchError(this.handleError))
  }

  //! Put one
  checkUserName(username: string): Observable<any> {
    let direction = this.url + 'users/available/' + username
    return this.http.get<any>(direction).pipe(catchError(this.handleError))
  }
}
