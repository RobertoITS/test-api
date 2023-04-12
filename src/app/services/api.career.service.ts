import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCareerService {

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

    //! GET
    getCareer(): Observable<any>{ // Get all records
      let direction: string = this.url + 'career'
      return this.http.get<any>(direction).pipe(catchError(this.handleError))
    }
    searchOneByParameters(parameter: string): Observable<any> { // Get various records by parameter
      let direction: string = this.url + 'careers/' + parameter
      return this.http.get<any>(direction).pipe(catchError(this.handleError))
    }
    getOneCareer(id: string): Observable<any> { // Get one record
      let direction = this.url + 'career/' + id
      return this.http.get<any>(direction).pipe(catchError(this.handleError))
    }

    //! POST
    postCareer(object: any): Observable<any> { // Create a new record
      let direction = this.url + 'career'
      return this.http.post<any>(direction, object)
      .pipe(
        catchError(this.handleError),
        tap(() => {
          this._refresh$.next()
        })
      )
    }

    //! PUT
    putCareer(id: string, object:any): Observable<any>{ // Edit one record
      let direction: string = this.url + 'career/' + id
      return this.http.put(direction, object)
        .pipe(
          catchError(this.handleError),
          tap(() => {
            this._refresh$.next()
          })
        )
    }
    //! DELETE
    deleteCareer(id:string): Observable<any> {
      let direction: string = this.url + 'career/' + id
      return this.http.delete(direction)
        .pipe(
          catchError(this.handleError),
          tap(() => {
            this._refresh$.next()
          })
        )
    }
}
