import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})
export class RouteDetailsComponent implements OnInit {
  
  id: number | undefined;
  trajet = ['Angers', 'Nantes', 'Brest', 'Paris'];

  departure = 0;
  arrival = this.trajet.length-1;

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
  }
}
