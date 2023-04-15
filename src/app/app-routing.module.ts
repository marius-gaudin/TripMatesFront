import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from './auth/authorize.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { AddRouteComponent } from './pages/add-route/add-route.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyRoutesComponent } from './pages/my-routes/my-routes.component';
import { RouteDetailsComponent } from './pages/route-details/route-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [AuthorizeGuard] },
  { path: 'add-route', component: AddRouteComponent, canActivate: [AuthorizeGuard] },
  { path: 'my-route', component: MyRoutesComponent, canActivate: [AuthorizeGuard] },
  { path: 'detail/:id', component: RouteDetailsComponent, canActivate: [AuthorizeGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class AppRoutingModule { }
