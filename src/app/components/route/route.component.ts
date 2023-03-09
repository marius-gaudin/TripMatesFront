import { Component, Input, ViewChild } from '@angular/core';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent {
  @Input() trajet: string = '16 mars 2023';
  @ViewChild('map') map: google.maps.Map | undefined;
  faUser: IconDefinition = faUser;
  
  options: google.maps.MapOptions = {
    disableDoubleClickZoom: true,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    zoomControl: false,
    draggable: false
  };

  startMarker: google.maps.LatLngLiteral = {
    lat: 47.205660789143685, 
    lng: -1.5393894460717485
  }

  arrivalMarker: google.maps.LatLngLiteral = {
    lat: 47.46472323621086, 
    lng: -0.5562843037338833
  }

  ngAfterViewInit() {
    if(this.startMarker && this.arrivalMarker && this.map) {
      const bounds = new google.maps.LatLngBounds()
      bounds.extend(this.startMarker)
      bounds.extend(this.arrivalMarker)
      this.map.fitBounds(bounds)
    }
  }

}
