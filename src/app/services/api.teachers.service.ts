import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTeachersService {

  constructor(private http: HttpClient) { }

  private direction = 'http://localhost:3000/api/attendance'

  //! BAD REQUEST HANDLER
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error)
  }

  postAttendance(object: any): Observable<any> {
    return this.http.post<any>(this.direction, object).pipe(catchError(this.handleError))
  }
}
