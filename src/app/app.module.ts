import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { GoogleMapsModule } from '@angular/google-maps'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { LogoComponent } from './components/logo/logo.component';
import { AddRouteComponent } from './pages/add-route/add-route.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteComponent } from './components/route/route.component';
import { HeaderComponent } from './components/header/header.component';
import { MyRoutesComponent } from './pages/my-routes/my-routes.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { RouteDetailsComponent } from './pages/route-details/route-details.component';
import { ConfirmPassengersComponent } from './components/confirm-passengers/confirm-passengers.component';
import {MatSliderModule} from '@angular/material/slider';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddRouteComponent,
    LogoComponent,
    RouteComponent,
    MyRoutesComponent,
    HeaderComponent,
    RouteDetailsComponent,
    ConfirmPassengersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    GooglePlaceModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule, 
    MatNativeDateModule,
    GoogleMapsModule,
    MatSliderModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
