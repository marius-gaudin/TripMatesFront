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
  trajets$: Observable<ApiResponse> = this.apiService.getTrajets();

  constructor(private apiService: ApiService) {
  }
}
