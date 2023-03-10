import { Component } from '@angular/core';
import { faExclamation, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.scss']
})
export class MyRoutesComponent {
  faExclamation: IconDefinition = faExclamation;

  constructor(private apiService: ApiService) {
    this.apiService.getTrajets().subscribe(trajets => {
      console.log(trajets);
    })
  }
}
