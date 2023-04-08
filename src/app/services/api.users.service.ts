import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
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
  searchOneByParameters(value: string): Observable<any> {
    let direction = this.url + 'users/' + value
    return this.http.get(direction).pipe(catchError(this.handleError))
  }

  //! Post one
  checkUserName(username: string): Observable<any> {
    let direction = this.url + 'users/available-user-name/' + username
    return this.http.get<any>(direction).pipe(catchError(this.handleError))
  }
  checkCuil(cuil: string): Observable<any> {
    let direction = this.url + 'users/available-cuil/' + cuil
    return this.http.get<any>(direction).pipe(catchError(this.handleError))
  }
  register(object: any): Observable<any> {
    let direction = this.url + 'users'
    return this.http.post<any>(direction, object).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }

  //! Put one
  putUser(object: any, id: string): Observable<any> {
    let direction = this.url + 'users/' + id
    return this.http.put(direction, object).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }

  //! Delete one
  deleteOne(id: string){
    let direction = this.url + 'users/' + id
    return this.http.delete(direction).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }
}
