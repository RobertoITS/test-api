import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = 'http://localhost:3000/api/'

  constructor(private http: HttpClient) { }

    //! PARA MANEJAR LOS BAD REQUEST
    handleError(error: HttpErrorResponse) {
      return throwError(() => error)
    }

  //! TESTING
  getUsers(): Observable<any> {
    let direction: string = this.url + 'users'
    return this.http.get<any>(direction).pipe(catchError(this.handleError))
  }

  //! Login service
  login(form: Login): Observable<any> {
    let direction: string = this.url + 'auth/login'
    return this.http.post<any>(direction, form).pipe(catchError(this.handleError))
  }


  //! ---------------- CAREER -------------------
  getCareer(): Observable<any>{
    let direction: string = this.url + 'career'
    return this.http.get<any>(direction).pipe(catchError(this.handleError))
  }
  postCareer(object: any): Observable<any> {
    let direction = this.url + 'career'
    return this.http.post<any>(direction, object).pipe(catchError(this.handleError))
  }
  putCareer(id: string, object:any): Observable<any>{
    let direction: string = this.url + 'career/' + id
    return this.http.put(direction, object).pipe(catchError(this.handleError))
  }
  deleteCareer(id:string): Observable<any> {
    let direction: string = this.url + 'career/' + id
    return this.http.delete(direction).pipe(catchError(this.handleError))
  }
}
