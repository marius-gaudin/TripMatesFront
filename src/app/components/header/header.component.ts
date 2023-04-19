import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faUser = faUser;

  constructor(private jwtTokenService: JwtTokenService, private router: Router) {}

  logout() {
    this.jwtTokenService.removeToken();
    this.router.navigate(['login'])
  }
}
