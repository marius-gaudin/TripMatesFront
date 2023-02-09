import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { ApiResponse } from 'src/app/models/apiResponse';

const {
  email, required
} = Validators;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: [null, [email, required]],
    password: [null, required]
  });
  errors:  string = '';

  get email(): string {
    return this.loginForm.value?.email ?? '';
  }

  get password(): string {
    return this.loginForm.value?.password ?? '';
  }

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService, private jwtTokenService:JwtTokenService) { }

  checkEmailErrors() {
    console.log('ok');
    this.errors = this.loginForm.get('email')?.errors ? 'Veuillez entrer un email valide' : this.errors;
  }

  onSubmit() {
    const err = 'Erreur veuillez réessayer dans quelque temps';
    this.apiService.login(this.email, this.password).subscribe({
      next: (response: ApiResponse) => {
        if(response?.result?.token) {
          this.errors = '';
          this.jwtTokenService.setToken(response.result.token);
          this.router.navigate(['']);
        } else {
          this.errors = err;
        }
      },
      error: (error) => {
        console.log(error)
        if(error?.error?.errorMessage) {
          this.errors = error.error.errorMessage;
        } else {
          this.errors = err;
        }
      }
    })
  }
}
