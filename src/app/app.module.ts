import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PagesModule } from './pages/pages.module';
import { RolePermissionsDirective } from './middleware/directive/role.permissions.directive';
import { JwtInterceptor } from './middleware/interceptors/jwt.interceptor';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RolePermissionsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    QRCodeModule
  ],
  providers: [
    CookieService, //* See ngx-cookie-service dependence
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } //* Inject interceptor (handle headers whit token)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
