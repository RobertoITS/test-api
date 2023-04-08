import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkUserLogin(route)
  }

  private checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    const role: string = this.cookieService.get('MD5') //! OBTENEMOS EL ROL ENCRIPTADO
    const roles = route.data['role'] as Array<string> // Obtenemos la info desde las rutas
    const encryptRoles: any[] = []
    for(const role of roles){ //! ENCRIPTAMOS LOS ROLES OBTENIDOS
      encryptRoles.push(crypto.MD5(role).toString())
    }
    if(encryptRoles.includes(role)){ //! COMPROBAMOS QUE EXISTA EL ROL PARA INGRESAR A LAS RUTAS
      return true
    }
    else {
      this.router.navigate(['/', 'dashboard'])
      return false
    }
  }
}
