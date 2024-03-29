import { Component, Input, ViewChild } from '@angular/core';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Route } from 'src/app/models/route';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent {

  @ViewChild('map') map: google.maps.Map | undefined
  faUser: IconDefinition = faUser;
  @Input() route: Route | undefined;
  
  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDoubleClickZoom: true,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,
	  draggable: false
  };

  markers: google.maps.LatLngLiteral[] = [];

  ds: google.maps.DirectionsService = new google.maps.DirectionsService();
  dr: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer({
    map: null,
    suppressMarkers: true
  });

  constructor() {
  }

  ngAfterViewInit() {
    if(!this.route) return;
    if(this.route.steps[0].positionDepart.latitude && this.route.steps[0].positionDepart.longitude) {
      this.markers.push({lat: this.route.steps[0].positionDepart.latitude, lng: this.route.steps[0].positionDepart.longitude});
    }
    this.route.steps.forEach(step => {
      if(step.positionArrival.latitude && step.positionArrival.longitude) {
        this.markers.push({lat: step.positionArrival.latitude, lng: step.positionArrival.longitude});
      }
    });
    console.log(this.markers);
    this.fitBounds();
    this.setRoutePolyline();
  }

  fitBounds() {    
    if(this.map) {  
      const bounds = new google.maps.LatLngBounds();
      this.markers.forEach(marker => {
        bounds.extend(marker);
      })
      this.map.fitBounds(bounds);
    }
  }

  setRoutePolyline() {
    const request = {
      origin: this.markers[0],
      destination: this.markers[this.markers.length-1],
      waypoints: this.markers.slice(1, this.markers.length).map(mrk => {return {location: mrk, stopover: true}}),
      travelMode: google.maps.TravelMode.DRIVING
    }

    this.ds.route(request, (response, status) => {
      if(this.map && status == google.maps.DirectionsStatus.OK){
        this.dr.setMap(this.map.data.getMap());
        this.dr.setDirections(response);
      }
    })
  }

  getDate(index: number): Date | undefined {
    if(!this.route) return;
    let depart = new Date(this.route.steps[0].departTime);
    let duration = 0;
    for(let i=0; i<index; i++) {
      duration += this.route.steps[i].duration;
    }
    return new Date(depart.getTime() + duration * 60000);
  }

}
