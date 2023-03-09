import { Component } from '@angular/core';
import { faExclamation, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.scss']
})
export class MyRoutesComponent {
  faExclamation: IconDefinition = faExclamation;
}
