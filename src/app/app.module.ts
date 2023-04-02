import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApiService } from './services/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { CareerComponent } from './career/career.component';
import { MateriaComponent } from './materia/materia.component';
import { CommissionComponent } from './commission/commission.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CareerComponent,
    MateriaComponent,
    CommissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CookieService, //* See ngx-cookie-service dependence
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } //* Inject interceptor (handle headers whit token)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
