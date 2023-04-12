import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMateriaService {

  private url: string = 'http://localhost:3000/api/'

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

  //! GET
  getMaterias(): Observable<any> {
    let direction = this.url + 'materia/'
    return this.http.get<any>(direction).pipe(catchError(this.handleError))
  }
  getOneByParameter(param: string): Observable<any> {
    let direction = this.url + 'materia/parameter/' + param
    return this.http.get(direction).pipe(catchError(this.handleError))
  }

  //! POST
  postOne(object: any): Observable<any>{
    let direction = this.url + 'materia/'
    return this.http.post<any>(direction, object).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }

  //! PUT
  putOne(object: any): Observable<any> {
    let direction = this.url + 'materia/' + object.id
    return this.http.put<any>(direction, object).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }

  //! DELETE
  deleteOne(id: string): Observable<any> {
    let direction = this.url + 'materia/' + id
    return this.http.delete<any>(direction).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }
}
