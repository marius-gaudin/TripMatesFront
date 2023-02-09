import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';

const {
  email, required
} = Validators;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.formBuilder.group({
    email: [null, [email, required]],
    password: [null, required],
    confirmPassword: [null, required],
    firstName: [null, required],
    lastName: [null, required]
  });
  errors:  string = '';

  get email(): string {
    return this.registerForm.value?.email ?? '';
  }

  get password(): string {
    return this.registerForm.value?.password ?? '';
  }

  get confirmPassword(): string {
    return this.registerForm.value?.confirmPassword ?? '';
  }

  get lastName(): string {
    return this.registerForm.value?.lastName ?? '';
  }

  get firstName(): string {
    return this.registerForm.value?.firstName ?? '';
  }

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService, private jwtTokenService: JwtTokenService) { }

  checkEmailErrors() {
    this.errors = this.registerForm.get('email')?.errors ? 'Veuillez entrer un email valide' : this.errors;
  }

  onSubmit() {
    const err = 'Erreur veuillez réessayer dans quelque temps';
    this.apiService.register(this.email, this.lastName, this.firstName, this.password, this.confirmPassword).subscribe({
      next: (response: any) => {
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
