import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSchedulesService {

  private url: string = 'http://localhost:3000/api/schedules/'

  private _refresh$ = new Subject<void>() //* Una subscripcion para actualizar los datos en tiempo real

  get refresh$(){ //* La funcion para refrescar los datos
    return this._refresh$
  }

  constructor(private http: HttpClient) { }

  //! PARA MANEJAR LOS BAD REQUEST
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error)
  }

  //! POST
  postOne(object: any): Observable<any> {
    let direction = this.url
    return this.http.post<any>(direction, object).pipe(catchError(this.handleError), tap(() => { this._refresh$.next() }))
  }
}
