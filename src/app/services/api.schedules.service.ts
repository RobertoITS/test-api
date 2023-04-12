import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSchedulesService {

  private url: string = 'http://localhost:3000/api/schedules/'

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


  //! POST
  postOne(object: any): Observable<any> {
    let direction = this.url
    return this.http.post<any>(direction, object).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }

  //! GET
  getAll(): Observable<any> {
    return this.http.get<any>(this.url).pipe(catchError(this.handleError))
  }
  getOneByParameter(parameter: string): Observable<any> {
    let direction = 'http://localhost:3000/api/schedule/' + parameter
    return this.http.get<any>(direction).pipe(catchError(this.handleError))
  }

  //! PUT
  putOne(object: any): Observable<any> {
    let direction = this.url + object.id
    return this.http.put<any>(direction, object).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }

  //! DELETE
  deleteOne(id: string): Observable<any> {
    let direction = this.url + id
    return this.http.delete<any>(direction).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }
}
