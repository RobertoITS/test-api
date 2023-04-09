import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //! Encabezado de AUTORIZACION para obtener datos!!
    const token: string = this.cookieService.get('x-token') //* Obtenemos el token
    let req = request
    if(token){
      req = request.clone({ //* Agregamos el token en el header para usar en la API
        setHeaders: {
          authorization: token //`Bearer ${token}` no funciona con el Bearer
        }
      })
    }
    return next.handle(req);
  }
}
