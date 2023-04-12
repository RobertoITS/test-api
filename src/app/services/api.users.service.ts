import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  url: string = 'http://localhost:3000/api/'

  private _refresh$ = new Subject<void>() //* Subscription, real time data refresh

  get refresh$(){ //* Data refresh
    return this._refresh$
  }
  /*
  TODO: Any function that edit, delete or creates a record from the database, most call the "tap" function when it returns the data
  ? like this: return apiCall.get(direction).pipe(tap(() => { this._refresh$.next() })) ---> remember, finish whit the next() function
  */

  constructor(private http: HttpClient) { }

  //! BAD REQUEST HANDLER
  handleError(error: HttpErrorResponse) {
    return throwError(() => error)
  }

  //! LOGIN
  login(form: Login): Observable<any> {
    let direction: string = this.url + 'auth/login'
    return this.http.post<any>(direction, form).pipe(catchError(this.handleError))
  }

  //! GET
  getUsers(): Observable<any> {
    let direction: string = this.url + 'users'
    return this.http.get<any>(direction).pipe(catchError(this.handleError))
  }
  getOneByParameters(value: string): Observable<any> {
    let direction = this.url + 'users/parameters/' + value
    return this.http.get(direction).pipe(catchError(this.handleError))
  }
  getOneUser(id: string): Observable<any> {
    let direction = this.url + 'users/' + id
    return this.http.get(direction).pipe(catchError(this.handleError))
  }

  //! POST
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

  //! PUT
  putUser(object: any, id: string): Observable<any> {
    let direction = this.url + 'users/' + id
    return this.http.put(direction, object).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }

  //! DELETE
  deleteOne(id: string): Observable<any>{
    let direction = this.url + 'users/' + id
    return this.http.delete<any>(direction).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }

  //! GET teachers
  getTeachers(): Observable<any> {
    let direction = this.url + 'teachers/'
    return this.http.get<any>(direction).pipe(catchError(this.handleError))
  }
}
