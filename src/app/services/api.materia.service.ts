import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMateriaService {

  private url: string = 'http://localhost:3000/api/'

  private _refresh$ = new Subject<void>() //* Una subscripcion para actualizar los datos en tiempo real

  get refresh$(){ //* La funcion para refrescar los datos
    return this._refresh$
  }

  constructor(private http: HttpClient) { }

  //! PARA MANEJAR LOS BAD REQUEST
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error)
  }

  //! GET ALL
  getMaterias(): Observable<any> {
    let direction = this.url + 'materia/'
    return this.http.get<any>(direction).pipe(catchError(this.handleError))
  }

  //! POST ONE
  postOne(object: any): Observable<any>{
    let direction = this.url + 'materia/'
    return this.http.post<any>(direction, object).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }

  //! PUT ONE
  putOne(object: any): Observable<any> {
    let direction = this.url + 'materia/' + object.id
    return this.http.put<any>(direction, object).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }

  //! GET ONE BY PARAMETER
  getOneByParameter(param: string): Observable<any> {
    let direction = this.url + 'materia/parameter/' + param
    return this.http.get(direction).pipe(catchError(this.handleError))
  }

  //! DELETE ONE
  deleteOne(id: string): Observable<any> {
    let direction = this.url + 'materia/' + id
    return this.http.delete<any>(direction).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }
}