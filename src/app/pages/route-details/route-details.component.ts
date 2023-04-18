import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from 'src/app/models/route';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})
export class RouteDetailsComponent implements OnInit {
  
  id: number | undefined;
  departure: number = 0;
  arrival: number = 0;
  route: Route | undefined;

  constructor(private activatedRoute: ActivatedRoute, private apiService:ApiService){}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id) {
      this.apiService.getRoute(this.id).subscribe(result => {
        console.log(result);
        if(result.isSuccess) {
          this.route = result.result;
          if(this.route?.steps && this.route?.steps.length > 0) {
            this.arrival = this.route.steps.length;
          } else if(this.route?.steps && this.route?.steps.length === 1) {
            this.arrival = 1;
          }
        }
      })
    }
  }

  registration() {
    if(this.departure < this.arrival && this.id && this.route) {
      this.apiService.registration(this.id, this.route.steps.slice(this.departure, this.arrival).map(step => step.id ? step.id : -1)).subscribe(result => {
        console.log(result);
      })
    }
  }
}
