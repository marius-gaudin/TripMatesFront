import { Component } from '@angular/core';
import { faExclamation, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/apiResponse';
import { Route } from 'src/app/models/route';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.scss']
})
export class MyRoutesComponent {
  faExclamation: IconDefinition = faExclamation;
  trajets$: Observable<ApiResponse> = this.apiService.getUserRoutes();
  registrations$: Observable<ApiResponse> = this.apiService.getUserRegistration();

  constructor(private apiService: ApiService) {
    this.apiService.getUserRoutes().subscribe(result => {
      console.log(result);
    })
  }
}
