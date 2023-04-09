import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as crypto from 'crypto-js'

@Directive({
  selector: '[appRolePermissions]'
})
export class RolePermissionsDirective {

  private role: any[] = []
  private permissions: any[] = []

  constructor(
    private templateRef: TemplateRef<any>, // Se encargan de renderizar la vista
    private viewContainer: ViewContainerRef, // Es parecido al ngIf, pero personalizado
    private cookieService: CookieService // Ingresamos a las cookies
  ) { }

  ngOnInit(){
    this.role = [this.cookieService.get('MD5')] //! OBTENEMOS EL ROL ENCRIPTADO
    this.updateView()
  }

  @Input()
  set appRolePermissions(permissions: Array<string>) {
    //console.log('****', permissions);
    this.viewContainer.createEmbeddedView(this.templateRef) //templateRef hacer referencia al elemento HTML
    for(const p of permissions){ //! ENCRIPTAMOS LOS ROLES
      this.permissions.push(crypto.MD5(p).toString())
    }
    this.updateView()
  }

  private updateView() { //! SE ENCARGA DE MOSTRAS LAS VISTAS SI ES QUE TIENE LOS PERMISOS
    this.viewContainer.clear()
    if (this.checkPermissions()) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }

  private checkPermissions(): boolean {
    let hasPermission = false
    if (this.role) {
      for (const checkPermission of this.permissions) { //! CHEQUEAMOS SI ESTA EN LA LISTA DE PERMISOS
        const permissionFound = this.role.find((p: string) => {
          return (p === checkPermission)
        })

        if (permissionFound) {
          hasPermission = true
          break
        }
      }
    }
    return hasPermission
  }
}

