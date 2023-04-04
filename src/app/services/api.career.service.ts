import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCareerService {

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


    //! ---------------- CAREER -------------------
    getCareer(): Observable<any>{
      let direction: string = this.url + 'career'
      return this.http.get<any>(direction).pipe(catchError(this.handleError))
    }
    postCareer(object: any): Observable<any> {
      let direction = this.url + 'career'
      return this.http.post<any>(direction, object)
      .pipe(
        catchError(this.handleError),
        tap(() => {
          this._refresh$.next() //* Refresca los datos
        })
      )
    }
    putCareer(id: string, object:any): Observable<any>{
      let direction: string = this.url + 'career/' + id
      return this.http.put(direction, object)
        .pipe(
          catchError(this.handleError),
          tap(() => {
            this._refresh$.next()
          })
        )
    }
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
    searchOneByParameters(parameter: string): Observable<any> {
      let direction: string = this.url + 'careers/' + parameter
      return this.http.get<any>(direction).pipe(catchError(this.handleError))
    }
}
